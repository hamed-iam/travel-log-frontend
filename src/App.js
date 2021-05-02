import React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import mapPin from './assets/map-pin (1).svg';
import mapPinRed from './assets/map-pin-red.svg';
import LogEntryForm from './LogEntryForm';
// import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 35.68146673632163,
    longitude: 51.384656027344604,
    zoom: 5,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => {
        return (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              // offsetLeft={-12}
              // offsetTop={-24}
            >
              <div>
                <img
                  src={mapPin}
                  alt="pin"
                  style={{ maxHeight: '24px', maxWidth: '24px' }}
                  onClick={() => {
                    setShowPopup({
                      [entry._id]: true,
                    });
                  }}
                />
              </div>
            </Marker>
            {showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>
                    Visited on :{' '}
                    {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        );
      })}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <img
                src={mapPinRed}
                alt="pin"
                style={{
                  maxHeight: '24px',
                  maxWidth: '24px',
                  color: 'red',
                  transform: 'translate(-50%,-100%)',
                }}
              />
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm location={addEntryLocation} />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
