import React, { useState } from 'react';
import { CheckCircle, Circle, AlertCircle, Zap } from 'lucide-react';

export default function EpicUniverseMissionBrief() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [completedMissions, setCompletedMissions] = useState({});
  const [arrivalChecklist, setArrivalChecklist] = useState({});

  const agents = [
    { id: 'karkian', name: 'Dr. Karkian', location: 'Jacksonville, FL', color: '#8B4513' },
    { id: 'moose', name: 'Moose', location: 'San Fernandina Beach, FL', color: '#A0522D' },
    { id: 'tbone', name: 'T-Bone', location: 'Washington DC', color: '#654321' },
    { id: 'manishbee', name: 'Manishbee', location: 'Gainesville, FL', color: '#704214' },
    { id: 'superswiss', name: 'SuperSwiss', location: 'Orlando, FL', color: '#5D4037' },
  ];

  const missions = [
    { id: 'ticket', label: 'Acquire Park Ticket', icon: '🎫' },
    { id: 'app', label: 'Download Universal App', icon: '📱' },
    { id: 'packing', label: 'Pack Mission Essentials', icon: '🎒' },
    { id: 'preferences', label: 'Submit Preference Profile', icon: '✅' },
  ];

  const arrivalItems = [
    { id: 'checkin', label: 'Complete Hotel Check-In', icon: '🏨' },
    { id: 'roomkey', label: 'Obtain Room Key (Required for Early Entry!)', icon: '🔑' },
    { id: 'roommate', label: 'Confirm Roommate Assignments', icon: '👥' },
    { id: 'dinner', label: 'Coordinate Dinner Plans', icon: '🍽️' },
    { id: 'rides', label: 'Discuss First Ride Strategy', icon: '🎢' },
  ];

  const resources = [
    { name: 'Hotel: Endless Summer Resort - Surfside', detail: '7000 Universal Blvd, Orlando, FL 32819', icon: '🏨', url: 'https://www.universalorlando.com/accommodation/endless-summer-resort' },
    { name: 'Park Info', detail: 'Epic Universe Details & Map', icon: '🎢', url: 'https://www.universalorlando.com/web/en/us/theme-parks/epic-universe' },
    { name: 'Wait Times Tracker', detail: 'Real-Time Attraction Wait Times', icon: '⏱️', url: 'https://www.thrill-data.com/waittimes/epic-universe' },
    { name: 'Trip Playlist', detail: 'Spotify Collaborative Mix', icon: '🎵', url: 'https://open.spotify.com/playlist/7FIdW1JcJbnDznMXDtP9Px' },
  ];

  const rides = [
    { name: 'Stardust Racers', zone: 'How to Train Your Dragon Island' },
    { name: "Hiccup's Wing Gliders", zone: 'How to Train Your Dragon Island' },
    { name: 'Mario Kart: Bowser\'s Challenge', zone: 'Super Nintendo World' },
    { name: 'Donkey Kong: Mine Cart Madness', zone: 'Super Nintendo World' },
    { name: 'Monsters Unchained: Frankenstein Experiment', zone: 'Dark Universe' },
    { name: 'Harry Potter & the Battle at the Ministry', zone: 'The Wizarding World' },
    { name: 'Fyre Drill', zone: 'How to Train Your Dragon Island' },
    { name: 'Bowser Jr. Challenge', zone: 'Super Nintendo World' },
    { name: 'Harry Potter Show', zone: 'The Wizarding World' },
    { name: 'How to Train Your Dragon Show', zone: 'How to Train Your Dragon Island' },
  ];

  const handleMissionToggle = (agentId, missionId) => {
    const key = `${agentId}-${missionId}`;
    setCompletedMissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (agentId, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [agentId]: {
        ...prev[agentId],
        [field]: value
      }
    }));
  };

  const agent = agents.find(a => a.id === selectedAgent);

  return (
    <div className="min-h-screen text-gray-900 overflow-hidden" style={{ 
      backgroundColor: '#D4C5B0',
      fontFamily: "'Courier New', monospace",
      backgroundImage: `
        repeating-linear-gradient(
          0deg,
          rgba(139, 69, 19, 0.03) 0px,
          rgba(139, 69, 19, 0.03) 1px,
          transparent 1px,
          transparent 2px
        )
      `
    }}>
      <div className="relative z-10">
        {/* Header - File Folder Style */}
        <div className="sticky top-0 bg-gradient-to-b from-amber-100 to-amber-50 border-b-4 border-amber-900 shadow-lg" style={{ backgroundImage: `repeating-linear-gradient(90deg, #D4C5B0 0px, #D4C5B0 2px, #C9BCA7 2px, #C9BCA7 4px)` }}>
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="mb-3 text-xs tracking-widest font-bold text-amber-900">CLASSIFIED - EYES ONLY</div>
            <h1 className="text-4xl font-black text-amber-900 mb-1" style={{ letterSpacing: '2px' }}>
              OPERATION: EPIC UNIVERSE
            </h1>
            <div className="flex justify-between items-end">
              <p className="text-amber-800 text-sm font-mono">Mission Briefing • 31 JAN - 2 FEB 2026</p>
              <div className="text-red-600 font-black text-lg transform -rotate-12" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}>
                ⬤ CLASSIFIED ⬤
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          {!selectedAgent ? (
            // Agent Selection Screen
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-black text-amber-900 mb-2 tracking-wide">SELECT OPERATIVE DOSSIER</h2>
                <div className="w-16 h-1 bg-red-600 mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {agents.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAgent(a.id)}
                      className="group relative overflow-hidden transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
                      style={{
                        backgroundColor: '#E8DCC8',
                        border: '3px solid #8B4513',
                        boxShadow: '4px 4px 0px rgba(139, 69, 19, 0.3)'
                      }}
                    >
                      {/* Folder tab */}
                      <div className="absolute top-0 right-0 w-12 h-8 bg-amber-200" style={{ borderLeft: '3px solid #8B4513', borderBottom: '3px solid #8B4513' }}></div>
                      
                      <div className="p-6">
                        <div className="aspect-square bg-gray-300 border-2 border-gray-400 mb-4 flex items-center justify-center text-3xl font-black text-amber-900">
                          📋
                        </div>
                        <div className="text-sm font-bold text-amber-900 mb-1">{a.name}</div>
                        <div className="text-xs text-amber-800">{a.location}</div>
                        
                        {/* Red stamp effect on hover */}
                        <div className="absolute top-8 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform rotate-12">
                          <div className="border-2 border-red-600 px-3 py-1 text-red-600 font-black text-xs" style={{ letterSpacing: '1px' }}>
                            OPEN
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mission Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-black text-amber-900 mb-4 tracking-wide">MISSION PHASES</h2>
                  <div className="space-y-4 border-l-4 border-red-600 pl-6" style={{ backgroundColor: '#F5F0E8', padding: '20px', marginLeft: '-8px' }}>
                    <div>
                      <div className="text-red-600 font-black text-xs tracking-widest">PHASE 1: PRE-DEPLOYMENT</div>
                      <p className="text-amber-900 text-sm mt-1">Complete all mission prep tasks before arrival. Download Universal app, acquire tickets, and prepare preference profile.</p>
                    </div>
                    <div className="mt-6 pt-4 border-t-2 border-amber-300">
                      <div className="text-amber-900 font-black text-xs tracking-widest">PHASE 2: ARRIVAL (SAT 31 JAN)</div>
                      <p className="text-amber-900 text-sm mt-1">Hotel check-in at 4pm. Secure room key for early entry credentials. Strategic dining to fuel the operation.</p>
                    </div>
                    <div className="mt-6 pt-4 border-t-2 border-amber-300">
                      <div className="text-red-700 font-black text-xs tracking-widest">⬤ PHASE 3: MAIN OPERATION (SUN 1 FEB) ⬤</div>
                      <p className="text-amber-900 text-sm mt-1">Early park entry 9am. Execute ride strategy. 13 attractions to conquer. Shuttle departure 8am sharp.</p>
                    </div>
                    <div className="mt-6 pt-4 border-t-2 border-amber-300">
                      <div className="text-amber-900 font-black text-xs tracking-widest">PHASE 4: EXTRACTION (MON 2 FEB)</div>
                      <p className="text-amber-900 text-sm mt-1">Mission debrief. Departure timeline TBD.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-amber-900 mb-4 tracking-wide">CRITICAL INTEL</h2>
                  <div className="space-y-3">
                    {resources.map((res, i) => (
                      <div key={i} className="p-4" style={{ backgroundColor: '#F5F0E8', border: '2px solid #8B4513' }}>
                        <div className="font-black text-sm text-amber-900 mb-3">{res.name}</div>
                        <button
                          onClick={() => window.open(res.url, '_blank')}
                          className="w-full px-3 py-2 font-bold text-sm transition-all"
                          style={{
                            backgroundColor: '#8B4513',
                            color: '#F5F0E8',
                            border: '2px solid #5D4037',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#5D4037';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#8B4513';
                          }}
                        >
                          {res.detail}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Agent Mission Screen
            <div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="mb-8 px-4 py-2 font-bold text-amber-900 hover:text-amber-700 transition-colors text-sm tracking-wide"
                style={{ borderBottom: '2px solid #8B4513' }}
              >
                ← CLOSE DOSSIER
              </button>

              {/* Agent Dossier Header */}
              <div className="mb-8 p-8 relative" style={{ 
                backgroundColor: '#F5F0E8',
                border: '4px solid #8B4513',
                boxShadow: '6px 6px 0px rgba(139, 69, 19, 0.2)'
              }}>
                <div className="absolute top-4 right-4 transform rotate-45">
                  <div className="border-3 border-red-600 px-4 py-2 text-red-600 font-black text-xs" style={{ letterSpacing: '1px' }}>
                    TOP SECRET
                  </div>
                </div>
                
                <div className="flex items-start gap-6 mb-4">
                  <div className="w-24 h-32 bg-gray-300 border-3 border-gray-500 flex items-center justify-center text-5xl">
                    📸
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-red-600 font-bold tracking-widest mb-2">OPERATIVE DOSSIER</div>
                    <div className="text-3xl font-black text-amber-900 mb-2">{agent.name}</div>
                    <div className="text-sm text-amber-800 mb-4 font-mono">{agent.location}</div>
                    <div className="space-y-1 text-xs text-amber-800 border-t-2 border-amber-300 pt-3">
                      <div><span className="font-bold">STATUS:</span> ACTIVE</div>
                      <div><span className="font-bold">CLEARANCE:</span> LEVEL 5</div>
                      <div><span className="font-bold">ASSIGNMENT:</span> OPERATION EPIC UNIVERSE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Checklist */}
              <div className="mb-12">
                <h2 className="text-xl font-black text-amber-900 mb-6 tracking-wide">PRE-DEPLOYMENT MISSION CHECKLIST</h2>
                <div className="space-y-3 mb-6">
                  {missions.map(mission => {
                    const isCompleted = completedMissions[`${selectedAgent}-${mission.id}`];
                    return (
                      <button
                        key={mission.id}
                        onClick={() => handleMissionToggle(selectedAgent, mission.id)}
                        className="w-full flex items-center gap-4 p-4 transition-all"
                        style={{
                          backgroundColor: isCompleted ? '#E8D4C0' : '#F5F0E8',
                          border: '2px solid #8B4513',
                          boxShadow: '2px 2px 0px rgba(139, 69, 19, 0.1)'
                        }}
                      >
                        <div className="text-2xl">{mission.icon}</div>
                        <div className="flex-1 text-left">
                          <div className={`font-bold text-sm ${isCompleted ? 'line-through text-amber-700' : 'text-amber-900'}`}>
                            {mission.label}
                          </div>
                        </div>
                        <div className="text-xl">
                          {isCompleted ? (
                            <span className="text-red-600 font-black">✓</span>
                          ) : (
                            <span className="text-amber-400 font-black">◻</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4" style={{ backgroundColor: '#E8D4C0', border: '2px solid #8B4513' }}>
                  <div className="text-sm text-amber-900 font-mono">
                    <strong>PROGRESS:</strong> {Object.values(completedMissions).filter(v => v).length} / {missions.length} missions complete
                  </div>
                </div>
              </div>

              {/* Arrival Checklist */}
              <div className="mb-12">
                <h2 className="text-xl font-black text-amber-900 mb-6 tracking-wide">ARRIVAL CHECKLIST (SATURDAY)</h2>
                <div className="space-y-3 mb-6">
                  {arrivalItems.map(item => {
                    const isCompleted = arrivalChecklist[`${selectedAgent}-${item.id}`];
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setArrivalChecklist(prev => ({
                            ...prev,
                            [`${selectedAgent}-${item.id}`]: !prev[`${selectedAgent}-${item.id}`]
                          }));
                        }}
                        className="w-full flex items-center gap-4 p-4 transition-all"
                        style={{
                          backgroundColor: isCompleted ? '#E8D4C0' : '#F5F0E8',
                          border: '2px solid #8B4513',
                          boxShadow: '2px 2px 0px rgba(139, 69, 19, 0.1)'
                        }}
                      >
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1 text-left">
                          <div className={`font-bold text-sm ${isCompleted ? 'line-through text-amber-700' : 'text-amber-900'}`}>
                            {item.label}
                          </div>
                        </div>
                        <div className="text-xl">
                          {isCompleted ? (
                            <span className="text-red-600 font-black">✓</span>
                          ) : (
                            <span className="text-amber-400 font-black">◻</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4" style={{ backgroundColor: '#E8D4C0', border: '2px solid #8B4513' }}>
                  <div className="text-sm text-amber-900 font-mono">
                    <strong>ARRIVAL PREP:</strong> {Object.values(arrivalChecklist).filter((v, i, arr) => v && Object.keys(arrivalChecklist).filter(k => k.startsWith(selectedAgent)).length > 0).length} / {arrivalItems.length} items complete
                  </div>
                </div>
              </div>

              {/* Preferences Form */}
              <div className="mb-12">
                <h2 className="text-xl font-black text-amber-900 mb-6 tracking-wide">OPERATIVE PREFERENCES PROFILE</h2>
                
                <div className="space-y-6">
                  {/* Ride Priorities */}
                  <div className="p-6" style={{ backgroundColor: '#F5F0E8', border: '3px solid #8B4513', boxShadow: '3px 3px 0px rgba(139, 69, 19, 0.15)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={20} className="text-red-600" />
                      <h3 className="text-lg font-black text-amber-900">MUST-RIDE ATTRACTIONS</h3>
                    </div>
                    <p className="text-amber-900 text-sm mb-4">Select any rides you absolutely want to experience</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {rides.map(ride => (
                        <label key={ride.name} className="flex items-start gap-3 p-3 cursor-pointer hover:bg-amber-100/50 transition-colors" style={{ backgroundColor: '#F5F0E8', border: '2px solid #C9BCA7' }}>
                          <input
                            type="checkbox"
                            checked={preferences[selectedAgent]?.rides?.includes(ride.name) || false}
                            onChange={(e) => {
                              const currentRides = preferences[selectedAgent]?.rides || [];
                              const newRides = e.target.checked
                                ? [...currentRides, ride.name]
                                : currentRides.filter(r => r !== ride.name);
                              handlePreferenceChange(selectedAgent, 'rides', newRides);
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-bold text-amber-900 text-sm">{ride.name}</div>
                            <div className="text-xs text-amber-800">{ride.zone}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="p-3" style={{ backgroundColor: '#F5F0E8', border: '2px solid #C9BCA7' }}>
                      <label className="block mb-2">
                        <div className="font-bold text-amber-900 text-sm mb-2">Other Attraction:</div>
                        <input
                          type="text"
                          placeholder="Describe another ride or attraction..."
                          value={preferences[selectedAgent]?.otherRide || ''}
                          onChange={(e) => handlePreferenceChange(selectedAgent, 'otherRide', e.target.value)}
                          className="w-full p-2 border border-amber-300 bg-white text-amber-900 text-sm font-mono"
                          style={{ color: '#5D4037' }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Arrival Time */}
                  <div className="p-6" style={{ backgroundColor: '#F5F0E8', border: '3px solid #8B4513', boxShadow: '3px 3px 0px rgba(139, 69, 19, 0.15)' }}>
                    <h3 className="text-lg font-black text-amber-900 mb-4">ARRIVAL WINDOW (SATURDAY)</h3>
                    <div className="space-y-2">
                      {[
                        { value: 'early', label: 'By 5pm (dinner with group)' },
                        { value: 'late', label: 'After dinner (separate meal)' }
                      ].map(opt => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`${selectedAgent}-arrival`}
                            value={opt.value}
                            checked={preferences[selectedAgent]?.arrival === opt.value}
                            onChange={() => handlePreferenceChange(selectedAgent, 'arrival', opt.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-amber-900 font-mono text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dinner Choice */}
                  {preferences[selectedAgent]?.arrival === 'early' && (
                    <div className="p-6" style={{ backgroundColor: '#F5F0E8', border: '3px solid #8B4513', boxShadow: '3px 3px 0px rgba(139, 69, 19, 0.15)' }}>
                      <h3 className="text-lg font-black text-amber-900 mb-4">DINNER DESTINATION</h3>
                      <div className="space-y-2 mb-4">
                        {[
                          { value: 'texas', label: 'Texas de Brazil - $70 (unlimited meat)' },
                          { value: 'millers', label: "Miller's Ale House - $30 (burgers, steaks)" },
                          { value: 'seasons', label: "Season's 52" },
                          { value: 'hotel', label: 'Hotel (Beach Break Cafe) - $20' },
                          { value: 'noodles', label: 'Noodles and Co' },
                          { value: 'flexible', label: "Figure it out when we get there (stop planning, Mark)" },
                          { value: 'own', label: 'Bring your own' }
                        ].map(opt => (
                          <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`${selectedAgent}-dinner`}
                              value={opt.value}
                              checked={preferences[selectedAgent]?.dinner === opt.value}
                              onChange={() => handlePreferenceChange(selectedAgent, 'dinner', opt.value)}
                              className="w-4 h-4"
                            />
                            <span className="text-amber-900 font-mono text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      <div className="p-3" style={{ backgroundColor: '#F5F0E8', border: '2px solid #C9BCA7' }}>
                        <label className="block">
                          <div className="font-bold text-amber-900 text-sm mb-2">Other Option:</div>
                          <input
                            type="text"
                            placeholder="Suggest a different restaurant..."
                            value={preferences[selectedAgent]?.otherDinner || ''}
                            onChange={(e) => handlePreferenceChange(selectedAgent, 'otherDinner', e.target.value)}
                            className="w-full p-2 border border-amber-300 bg-white text-amber-900 text-sm font-mono"
                            style={{ color: '#5D4037' }}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Breakfast Choice */}
                  <div className="p-6" style={{ backgroundColor: '#F5F0E8', border: '3px solid #8B4513', boxShadow: '3px 3px 0px rgba(139, 69, 19, 0.15)' }}>
                    <h3 className="text-lg font-black text-amber-900 mb-4">SUNDAY BREAKFAST</h3>
                    <div className="space-y-2">
                      {[
                        { value: 'hotel', label: 'Eat at hotel restaurant' },
                        { value: 'bring', label: 'Bring/make our own' }
                      ].map(opt => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`${selectedAgent}-breakfast`}
                            value={opt.value}
                            checked={preferences[selectedAgent]?.breakfast === opt.value}
                            onChange={() => handlePreferenceChange(selectedAgent, 'breakfast', opt.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-amber-900 font-mono text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="mt-8 p-4" style={{ backgroundColor: '#FFE4E1', border: '3px solid #8B4513' }}>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5 font-black" />
                    <div className="text-sm text-amber-900 font-mono">
                      <strong>PROFILE STATUS:</strong> Your preferences are saved automatically. Share this dossier link with your operatives.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4" style={{ backgroundColor: '#F5F0E8', border: '2px solid #8B4513' }}>
                  <div className="text-sm text-amber-900">
                    <div className="font-black text-amber-900 mb-2">HOTEL DETAILS</div>
                    <div>Endless Summer Resort - Surfside</div>
                    <div>7000 Universal Blvd, Orlando, FL 32819</div>
                    <div className="text-xs mt-2 text-red-600 font-bold">⚠️ NOT DOCKSIDE!</div>
                  </div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#F5F0E8', border: '2px solid #8B4513' }}>
                  <div className="text-sm text-amber-900">
                    <div className="font-black text-amber-900 mb-2">SHUTTLE SCHEDULE</div>
                    <div>Departs: 8:00 AM</div>
                    <div>Travel Time: 13 minutes</div>
                    <div>Early Entry: 9:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
