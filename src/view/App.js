import './App.scss';

function App() {
  return (
    <div id="App">
      <div className="container">
        <nav className="global-nav">
            <div className="global-nav-links">
                <a href="#" className="global-nav-item">Rooms</a>
                <a href="#" className="global-nav-item">Ideas</a>
                <a href="#" className="global-nav-item">Stores</a>
                <a href="#" className="global-nav-item">Contact</a>
            </div>
        </nav>
          <nav className="local-nav">
              <div className="local-nav-links">
                  <a href="" className="product-name">AirMug Pro</a>
                  <a href="" className="">개요</a>
                  <a href="" className="">제품사양</a>
                  <a href="" className="">구입하기</a>
              </div>
          </nav>
      </div>
    </div>
  );
}

export default App;
