import React from "react";
import "./CardDetailModal.css";

export default function CardDetailModal({ card, list, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content card-detail-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="cdm-header">
          <div className="cdm-title-row">
            <i className="bi bi-credit-card cdm-title-icon"></i>
            <h3 className="cdm-title">{card.text}</h3>
          </div>
          <div className="cdm-in-list">in list <b>{list.title}</b></div>
        </div>
        <div className="cdm-main">
          <div className="cdm-main-left">
            <div className="cdm-section cdm-members-row">
              <div className="cdm-label">Members</div>
              <div className="cdm-members">
                <div className="cdm-avatar">SD</div>
                <button className="cdm-add-member">+</button>
              </div>
              <div className="cdm-label cdm-noti-label">Notifications</div>
              <button className="cdm-watch-btn">Watch</button>
            </div>
            <div className="cdm-section">
              <div className="cdm-label">Description</div>
              <textarea className="cdm-desc-input" placeholder="Add a more detailed description" />
            </div>
            <div className="cdm-section">
              <div className="cdm-label">Activity</div>
              <button className="cdm-show-details">Show details</button>
              <div className="cdm-activity-row">
                <div className="cdm-avatar cdm-avatar-sm">SD</div>
                <input className="cdm-comment-input" placeholder="Write a comment" />
              </div>
            </div>
          </div>
          <div className="cdm-main-right">
            <div className="cdm-section">
              <div className="cdm-label">Add to card</div>
              <button className="cdm-side-btn"><i className="bi bi-person"></i> Members</button>
            </div>
            <div className="cdm-section">
              <div className="cdm-label">Power-Ups</div>
              <button className="cdm-side-btn"><i className="bi bi-github"></i> GitHub</button>
              <button className="cdm-side-btn">Attach Branch</button>
              <button className="cdm-side-btn">Attach Commit</button>
              <button className="cdm-side-btn">Attach Issue</button>
              <button className="cdm-side-btn">Attach Pull Request...</button>
            </div>
            <div className="cdm-section">
              <button className="cdm-archive-btn"><i className="bi bi-archive"></i> Archive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
