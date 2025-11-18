import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdGenerator from "./AdGenerator";
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("ads");
    const [historyOpen, setHistoryOpen] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { id: 1, role: "assistant", text: "Welcome — start by typing a prompt for the selected generator." },
    ]);
    const [input, setInput] = useState("");

    const sampleHistory = {
        ads: [
            { id: 101, title: "Perfume Luxury 15s", snippet: "Aromatic luxury for every moment..." },
            { id: 102, title: "Eco Bottle Campaign", snippet: "Sustainable, stylish, made for you." },
        ],
        images: [
            { id: 201, title: "Product Shot - Before/After", thumbnail: null },
            { id: 202, title: "Model Lighting Fix", thumbnail: null },
        ],
        scripts: [],
        captions: [],
    };

    function handleSendPrompt() {
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), role: "user", text: input };
        setChatMessages((m) => [...m, userMsg]);

        const fakeResponse = {
            id: Date.now() + 1,
            role: "assistant",
            text: `Generated (${activeTab.toUpperCase()}): Example output for prompt \"${input}\"`,
        };

        setTimeout(() => {
            setChatMessages((m) => [...m, fakeResponse]);
        }, 800);

        setInput("");
    }

    return (
        <div className="d-flex vh-100 overflow-hidden">

            {/* Sidebar */}
            <aside
                className="bg-light border-end p-3 d-flex flex-column"
                style={{ width: sidebarCollapsed ? 72 : 240 }}
            >
                <div className="d-flex align-items-center mb-4">
                    <div className="me-2">
                        <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                            style={{ width: 40, height: 40 }}
                        >
                            AI
                        </div>
                    </div>
                    {!sidebarCollapsed && <h5 className="mb-0">AdFusion</h5>}
                </div>

                <nav className="flex-grow-1">
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <button
                                className="btn btn-outline-primary w-100 text-start"
                                onClick={() => setActiveTab("home")}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button
                                className={`btn w-100 text-start ${activeTab === "ads" ? "btn-primary text-white" : "btn-light"}`}
                                onClick={() => setActiveTab("ads")}
                            >
                                Ad Generator
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button
                                className={`btn w-100 text-start ${activeTab === "scripts" ? "btn-primary text-white" : "btn-light"}`}
                                onClick={() => setActiveTab("scripts")}
                            >
                                Script Generator
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button
                                className={`btn w-100 text-start ${activeTab === "captions" ? "btn-primary text-white" : "btn-light"}`}
                                onClick={() => setActiveTab("captions")}
                            >
                                Caption Generator
                            </button>
                        </li>
                        <li className="nav-item mb-2">
                            <button
                                className={`btn w-100 text-start ${activeTab === "images" ? "btn-primary text-white" : "btn-light"}`}
                                onClick={() => setActiveTab("images")}
                            >
                                Image Enhancer
                            </button>
                        </li>

                        <li className="nav-item mt-3">
                            <button
                                className="btn btn-outline-secondary w-100 text-start"
                                onClick={() => setHistoryOpen((s) => !s)}
                            >
                                {historyOpen ? "Hide History" : "Show History"}
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="mt-3">
                    <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => setSidebarCollapsed((s) => !s)}
                    >
                        {sidebarCollapsed ? "Expand" : "Collapse"}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-grow-1 d-flex flex-column">
                {/* Topbar */}
                <header className="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <div className="d-flex align-items-center">
                        <h5 className="me-3 mb-0">
                            {activeTab === "home"
                                ? "Overview"
                                : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h5>
                        <div className="input-group" style={{ minWidth: 360 }}>
                            <input className="form-control" placeholder="Search history, templates or prompts" />
                            <button className="btn btn-outline-secondary">Search</button>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-outline-primary me-2">New</button>
                        <div
                            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                            style={{ width: 36, height: 36 }}
                        >
                            U
                        </div>
                    </div>
                </header>

                {/* Content area */}
                {/* Content area */}
<div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>

  {/* LEFT AREA — Generator or Chat */}
  <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>

    {/* If Ad tab → show AdGenerator */}
    {activeTab === "ads" && <AdGenerator userId={1} />}

    {/* Otherwise show the chat interface */}
    {activeTab !== "ads" && (
      <div className="d-flex flex-column" style={{ height: "100%" }}>
        <div
          className="border rounded p-3 mb-3 flex-grow-1"
          style={{ overflowY: "auto", background: "#fbfbfb" }}
        >
          {chatMessages.map((m) => (
            <div
              key={m.id}
              className={`mb-3 ${m.role === "user" ? "text-end" : "text-start"}`}
            >
              <div
                className={`d-inline-block p-2 rounded ${
                  m.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white border"
                }`}
                style={{ maxWidth: "78%" }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="mt-2">
          <div className="d-flex gap-2 align-items-center">
            <input
              className="form-control"
              placeholder={`Type prompt for ${activeTab}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
            />
            <button className="btn btn-primary" onClick={handleSendPrompt}>
              Generate
            </button>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* RIGHT SIDEBAR HISTORY */}
  {historyOpen && (
    <aside
      className="border-start bg-white p-3"
      style={{ width: 300, overflowY: "auto" }}
    >
      <h6 className="mb-3">History</h6>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {["ads", "images", "scripts", "captions"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* History content */}
      {(sampleHistory[activeTab] || []).length === 0 ? (
        <p className="text-muted small">No history yet.</p>
      ) : (
        sampleHistory[activeTab].map((item) => (
          <div key={item.id} className="border rounded p-2 mb-2">
            <strong>{item.title}</strong>
            {item.snippet && <p className="small mb-0">{item.snippet}</p>}
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=""
                className="img-fluid rounded mt-2"
              />
            )}
          </div>
        ))
      )}
    </aside>
  )}
</div>

            </main>
        </div>
    );
}
