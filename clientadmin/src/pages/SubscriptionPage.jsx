import React, { useEffect, useState } from "react";
import { subscriptionService } from "../services/subscriptionService";

const SubscriptionPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await subscriptionService.getPlans();
      if (result.success) setItems(result.data || []);
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="page-title">Subscription</h2>
      <div className="stats-grid">
        {items.length === 0 ? (
          <div className="stat-card">
            <h3>No subscription data</h3>
            <p>Backend route add hone ke baad yahan plans dikh jayenge.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="stat-card">
              <h3>{item.planName || "Plan"}</h3>
              <p>{item.amount || "-"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;