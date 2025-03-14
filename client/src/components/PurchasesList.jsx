import { imageGateway } from '../config/contract';
import usePurchases from '../hooks/usePurchases';

function PurchasesList({ onClose, onConsume }) {
  const {
    activeTab,
    setActiveTab,
    availablePurchases,
    consumedPurchases
  } = usePurchases();

  const handleOverlayClick = (e) => {
    if (e.target.className === 'purchases-modal') {
      onClose();
    }
  };

  return (
    <div className="purchases-modal" onClick={handleOverlayClick}>
      <div className="purchases-content">
        <div className="purchases-header">
          <h2>My Purchases</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="purchases-tabs">
          <button
            className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            Available ({availablePurchases.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History ({consumedPurchases.length})
          </button>
        </div>

        {activeTab === 'available' && (
          <div className="purchases-list">
            {availablePurchases.length === 0 ? (
              <div className="no-purchases">
                <p>No Available Items</p>
                <p className="subtext">Items you purchase will appear here.</p>
              </div>
            ) : (
              availablePurchases.map(purchase => (
                <div key={purchase.id} className="purchase-item available-item">
                  <div className="purchase-image">
                    <img src={`${imageGateway}${purchase.image}`} alt={purchase.name} />
                  </div>
                  <div className="purchase-details">
                    <h3>{purchase.name}</h3>
                    <p className="purchase-date">
                      Purchased on {purchase.purchaseDate.toLocaleDateString()}
                    </p>
                    <p className="purchase-price">${purchase.price.toFixed(2)}</p>
                  </div>
                  <div className="purchase-status">
                    <span className="status-badge available">Available</span>
                  </div>
                  <button
                    className="consume-button"
                    onClick={() => onConsume(purchase.id)}
                  >
                    <span className="consume-icon">☕</span> Consume Item
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="purchases-list">
            {consumedPurchases.length === 0 ? (
              <div className="no-purchases">
                <p>No Consumed Items</p>
                <p className="subtext">Items you've consumed will appear here.</p>
              </div>
            ) : (
              consumedPurchases.map(purchase => (
                <div key={purchase.id} className="purchase-item consumed-item">
                  <div className="purchase-image">
                    <img src={`${imageGateway}${purchase.image}`} alt={purchase.name} />
                  </div>
                  <div className="purchase-details">
                    <h3>{purchase.name}</h3>
                    <p className="purchase-date">
                      Purchased on {purchase.purchaseDate.toLocaleDateString()}
                    </p>
                    <p className="purchase-price">${purchase.price.toFixed(2)}</p>
                  </div>
                  <div className="purchase-status">
                    <span className="status-badge consumed">Consumed</span>
                  </div>
                  <div className="consumed-info">
                    <span className="consume-icon">☕</span> Already Consumed
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchasesList;