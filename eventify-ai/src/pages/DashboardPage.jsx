import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchEvents(user.uid); 
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);
  const fetchEvents = async (uid) => {
    setLoading(true);
    try {
      const eventsRef = collection(db, "users", uid, "events");
      const q = query(eventsRef, orderBy("date", "desc")); 
      
      const querySnapshot = await getDocs(q);
      const eventsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsList);
    } catch (e) {
      console.error("Error fetching events: ", e);
      alert("Could not fetch your events.");
    }
    setLoading(false);
  };

  if (loading) {
    return <div style={styles.loading}>Loading your dashboard...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>My Events</h1>
        <Link to="/create-event" style={styles.newButtonLink}>
          <button style={styles.newButton}>+ Create New Event</button>
        </Link>
      </div>
      
      {events.length === 0 ? (
        <p>You have no events. Click "Create New Event" to get started!</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Event Name/Type</th>
              <th>Date</th>
              <th>Budget</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.name || event.type}</td>
                <td>{event.date}</td>
                <td>₹{event.budget}</td>
                <td>
                  <Link to={`/event/${event.id}`}>
                    <button>View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  loading: { textAlign: 'center', marginTop: '50px', fontSize: '1.2rem' },
  container: { width: '90%', margin: '2rem auto', maxWidth: '1000px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '1rem' },
  newButtonLink: { textDecoration: 'none' },
  newButton: { background: '#22c55e', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '2rem' },
  
};