import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Garfish from 'garfish';
// import './App.css';

// 初始化 Garfish（只执行一次）
let garfishInitialized = false;

function Layout() {
  const location = useLocation();
  const containerRef = useRef(null);


  return (
    <div className="main-app">
      <header className="main-header">
        <h1>Garfish 微前端 Demo</h1>
        <nav className="main-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            首页
          </Link>
          {/* <Link to="/vue" className={location.pathname.startsWith('/vue') ? 'active' : ''}>
            Vue 子应用
          </Link> */}
          <Link to="/react" className={location.pathname.startsWith('/react') ? 'active' : ''}>
            React 子应用
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/vue/*" element={<SubAppContainer />} /> */}
          <Route path="/react/*" element={<SubAppContainer />} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      <h2>欢迎使用 Garfish 微前端框架</h2>
      <p>这是一个基于 Garfish 的微前端 Demo，包含以下子应用：</p>
      <ul>
        <li>
          <strong>Vue 子应用</strong>：基于 Vue 3 构建
        </li>
        <li>
          <strong>React 子应用</strong>：基于 React 18 构建
        </li>
      </ul>
      <p>点击上方导航栏可以切换到不同的子应用。</p>
    </div>
  );
}

function SubAppContainer() {
  return <div id="sub-app-container"></div>;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

