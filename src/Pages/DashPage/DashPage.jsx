import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./DashPage.css";
import { ref, onValue, set, push, remove, update } from "firebase/database";
import { realtimeDb } from "../../ConnetFirebase/firebase";
import CardDetailModal from "../CardDetailModal/CardDetailModal";

export default function DashPage() {
  const [lists, setLists] = useState([]);
  const [newCardText, setNewCardText] = useState({});
  const [editCard, setEditCard] = useState({});
  const [newListTitle, setNewListTitle] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    const listsRef = ref(realtimeDb, "lists");
    const unsubscribe = onValue(listsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Chuyển cards từ object sang array, lưu cả key
        const listsArr = Object.values(data).map(list => ({
          ...list,
          cards: list.cards ? Object.entries(list.cards).map(([key, card]) => ({ ...card, _key: key })) : []
        }));
        setLists(listsArr);
      } else {
        setLists([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Thêm danh sách mới
  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    const newListRef = push(ref(realtimeDb, "lists"));
    set(newListRef, {
      id: newListRef.key,
      title: newListTitle,
      cards: {},
    });
    setNewListTitle("");
  };

  // Xóa danh sách
  const handleDeleteList = (listId) => {
    remove(ref(realtimeDb, `lists/${listId}`));
  };

  // Thêm card mới
  const handleAddCard = (listId) => {
    if (!newCardText[listId] || !newCardText[listId].trim()) return;
    const cardId = `card-${Date.now()}`;
    const cardRef = push(ref(realtimeDb, `lists/${listId}/cards`));
    set(cardRef, { id: cardId, text: newCardText[listId] });
    setNewCardText({ ...newCardText, [listId]: "" });
  };

  // Xóa card
  const handleDeleteCard = (listId, cardId) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    const card = list.cards.find((c) => c.id === cardId);
    if (!card) return;
    remove(ref(realtimeDb, `lists/${listId}/cards/${card._key}`));
  };

  // Chỉnh sửa card
  const handleEditCard = (listId, cardId, text) => {
    setEditCard({ listId, cardId, text });
  };
  const handleSaveEdit = () => {
    const { listId, cardId, text } = editCard;
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    const card = list.cards.find((c) => c.id === cardId);
    if (!card) return;
    update(ref(realtimeDb, `lists/${listId}/cards/${card._key}`), { text });
    setEditCard({});
  };

  // Kéo thả card
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceList = lists.find((l) => l.id === source.droppableId);
    const destList = lists.find((l) => l.id === destination.droppableId);
    if (!sourceList || !destList) return;

    // Clone cards array để thao tác
    const sourceCards = [...sourceList.cards];
    const destCards = sourceList === destList ? sourceCards : [...destList.cards];
    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    // Cập nhật cards lên database
    if (sourceList === destList) {
      // Cùng 1 list
      const newCardsObj = {};
      destCards.forEach(card => {
        newCardsObj[card._key] = { id: card.id, text: card.text };
      });
      set(ref(realtimeDb, `lists/${sourceList.id}/cards`), newCardsObj);
    } else {
      // Khác list
      // Xóa khỏi list nguồn
      const newSourceCardsObj = {};
      sourceCards.forEach(card => {
        newSourceCardsObj[card._key] = { id: card.id, text: card.text };
      });
      set(ref(realtimeDb, `lists/${sourceList.id}/cards`), newSourceCardsObj);
      // Thêm vào list đích
      const newDestCardsObj = {};
      destCards.forEach(card => {
        newDestCardsObj[card._key] = { id: card.id, text: card.text };
      });
      set(ref(realtimeDb, `lists/${destList.id}/cards`), newDestCardsObj);
    }
  };

  return (
    <div className="dash-root">
      {/* Sidebar */}
      <aside className="sidebar bg-dark text-white">
        <div className="logo px-3 py-2">
          <img src={require("../../assets/image 9.png")} alt="Logo" style={{ width: 32 }} />
        </div>
        <nav className="mt-4">
          <div className="nav-item active">Boards</div>
          <div className="nav-item">All Members</div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content flex-grow-1">
        {/* Header */}
        <header className="header d-flex align-items-center justify-content-between px-4 py-2">
          <div className="header-title">My Trello board</div>
          <div className="header-actions d-flex align-items-center">
            <button className="btn btn-link text-white me-2">
              <i className="bi bi-bell"></i>
            </button>
            <div className="user-avatar bg-danger text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
              SD
            </div>
          </div>
        </header>

        {/* Board lists */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board-lists d-flex p-4">
            {lists.map((list, listIdx) => (
              <div key={list.id} className="trello-list bg-dark text-white p-3 me-3" style={{ minWidth: 270, borderRadius: 8 }}>
                <div className="fw-bold mb-2 d-flex justify-content-between align-items-center">
                  {list.title}
                  {lists.length > 0 && (
                    <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => handleDeleteList(list.id)} title="Delete list">
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
                <Droppable droppableId={list.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {list.cards.map((card, idx) => (
                        <Draggable key={card.id} draggableId={card.id} index={idx}>
                          {(provided) => (
                            <div
                              className="trello-card bg-black text-white mb-2 p-2 d-flex align-items-center"
                              style={{ borderRadius: 4 }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {editCard.cardId === card.id && editCard.listId === list.id ? (
                                <>
                                  <input
                                    value={editCard.text}
                                    onChange={e => setEditCard({ ...editCard, text: e.target.value })}
                                    className="form-control form-control-sm me-2"
                                    style={{ background: '#222', color: '#fff', border: '1px solid #555' }}
                                    autoFocus
                                  />
                                  <button className="btn btn-success btn-sm me-1" onClick={handleSaveEdit} title="Save"><i className="bi bi-check"></i></button>
                                  <button className="btn btn-secondary btn-sm" onClick={() => setEditCard({})} title="Cancel"><i className="bi bi-x"></i></button>
                                </>
                              ) : (
                                <>
                                  <span className="flex-grow-1" style={{ wordBreak: 'break-word' }}>{card.text}</span>
                                  <button className="btn btn-outline-light btn-sm ms-2" onClick={() => {
                                    setSelectedCard(card);
                                    setSelectedList(list);
                                  }} title="Edit"><i className="bi bi-pencil"></i></button>
                                  <button className="btn btn-outline-danger btn-sm ms-1" onClick={() => handleDeleteCard(list.id, card.id)} title="Delete"><i className="bi bi-trash"></i></button>
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className="d-flex mt-2">
                  <input
                    className="form-control form-control-sm me-2"
                    style={{ background: '#222', color: '#fff', border: '1px solid #555' }}
                    placeholder="+ Add a card"
                    value={newCardText[list.id] || ""}
                    onChange={e => setNewCardText({ ...newCardText, [list.id]: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && handleAddCard(list.id)}
                  />
                  <button className="btn btn-primary btn-sm" onClick={() => handleAddCard(list.id)} title="Add">+</button>
                </div>
              </div>
            ))}
            {/* Thêm danh sách mới */}
            <div className="trello-list bg-secondary text-white p-3" style={{ minWidth: 270, borderRadius: 8 }}>
              <input
                className="form-control form-control-sm mb-2"
                style={{ background: '#eee', color: '#222', border: '1px solid #bbb' }}
                placeholder="+ Add another list"
                value={newListTitle}
                onChange={e => setNewListTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddList()}
              />
              <button className="btn btn-dark btn-sm w-100" onClick={handleAddList}>Add List</button>
            </div>
          </div>
        </DragDropContext>
      </div>

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          list={selectedList}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
