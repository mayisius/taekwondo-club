import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:3001/api";

function MessageInbox({ token, onClose, onLogout, onMessagesUpdated }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchMessages = async (tab = activeTab, pageNumber = page) => {
    try {
      setLoading(true);
      setStatusMessage("");

      const response = await fetch(
        `${API_BASE}/messages?status=${tab}&page=${pageNumber}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudieron cargar los mensajes");
      }

      setMessages(data.messages || []);
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 });
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMessages(activeTab, page);
    }
  }, [token, activeTab, page]);

  const filteredMessages = useMemo(() => messages, [messages]);

  const updateMessageStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/messages/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo actualizar el mensaje");
      }

      await fetchMessages(activeTab, page);

      if (onMessagesUpdated) {
        onMessagesUpdated();
      }
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyDrafts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReplySend = async (message) => {
    const reply = replyDrafts[message.id]?.trim();

    if (!reply) {
      setStatusMessage("Escribe una respuesta antes de enviarla.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/messages/${message.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar la respuesta");
      }

      setReplyDrafts((prev) => ({
        ...prev,
        [message.id]: "",
      }));

      setStatusMessage(
        data.mailSent
          ? "Respuesta enviada correctamente."
          : "Respuesta guardada, pero el correo no se pudo enviar. Revisa SMTP."
      );

      setActiveTab("answered");
      setPage(1);

      if (onMessagesUpdated) {
        onMessagesUpdated();
      }
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="inbox-card">
        <div className="inbox-header">
          <div>
            <h2>Bandeja de mensajes</h2>
            <p>Gestión de mensajes por estado.</p>
          </div>

          <div className="inbox-actions">
            <button type="button" onClick={onLogout}>
              Cerrar sesión
            </button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>

        <div className="inbox-tabs">
          <button
            className={activeTab === "pending" ? "tab-active" : ""}
            onClick={() => {
              setActiveTab("pending");
              setPage(1);
            }}
            type="button"
          >
            Pendientes
          </button>

          <button
            className={activeTab === "answered" ? "tab-active" : ""}
            onClick={() => {
              setActiveTab("answered");
              setPage(1);
            }}
            type="button"
          >
            Contestados
          </button>

          <button
            className={activeTab === "trash" ? "tab-active" : ""}
            onClick={() => {
              setActiveTab("trash");
              setPage(1);
            }}
            type="button"
          >
            Papelera
          </button>
        </div>

        {statusMessage && <p className="inbox-status">{statusMessage}</p>}

        {loading ? (
          <p>Cargando mensajes...</p>
        ) : filteredMessages.length === 0 ? (
          <p className="messages-empty">No hay mensajes en esta bandeja.</p>
        ) : (
          <div className="messages-list">
            {filteredMessages.map((message) => (
              <article
                key={message.id}
                className={`message-card ${
                  message.status === "answered" ? "message-answered" : ""
                }`}
              >
                <div className="message-meta">
                  <strong>{message.name}</strong>
                  <span>{message.email}</span>
                  <time>{message.created_at}</time>
                </div>

                <p>{message.message}</p>

                {message.reply_text && (
                  <div className="reply-preview">
                    <strong>Respuesta enviada:</strong>
                    <p>{message.reply_text}</p>
                  </div>
                )}

                {message.status === "pending" && (
                  <div className="reply-box">
                    <textarea
                      rows="4"
                      placeholder="Escribe una respuesta..."
                      value={replyDrafts[message.id] || ""}
                      onChange={(e) =>
                        handleReplyChange(message.id, e.target.value)
                      }
                    />
                  </div>
                )}

                <div className="message-actions">
                  {message.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleReplySend(message)}
                      >
                        Responder y enviar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateMessageStatus(message.id, "answered")
                        }
                      >
                        Mover a contestados
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMessageStatus(message.id, "trash")}
                      >
                        Borrar
                      </button>
                    </>
                  )}

                  {message.status === "answered" && (
                    <button
                      type="button"
                      onClick={() => updateMessageStatus(message.id, "trash")}
                    >
                      Borrar
                    </button>
                  )}

                  {message.status === "trash" && (
                    <button
                      type="button"
                      onClick={() => updateMessageStatus(message.id, "pending")}
                    >
                      Restaurar
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="pagination-bar">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pagination.page <= 1}
          >
            Anterior
          </button>
          <span>
            Página {pagination.page} de {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={pagination.page >= pagination.totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageInbox;