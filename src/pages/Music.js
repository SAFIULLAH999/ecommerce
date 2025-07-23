import React, { useState } from 'react';
import './Music.css';

const Music = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { id: 1, title: "Sunset Dreams", artist: "Chill Vibes", duration: "3:45", genre: "Chill" },
    { id: 2, title: "Electric Nights", artist: "Neon Beats", duration: "4:12", genre: "Electronic" },
    { id: 3, title: "Ocean Waves", artist: "Nature Sounds", duration: "5:30", genre: "Ambient" },
    { id: 4, title: "City Lights", artist: "Urban Flow", duration: "3:28", genre: "Hip-Hop" }
  ];

  const featuredArtists = [
    { name: "Chill Vibes", followers: "1.2M", image: "🎵" },
    { name: "Neon Beats", followers: "890K", image: "����" },
    { name: "Nature Sounds", followers: "2.1M", image: "🌊" },
    { name: "Urban Flow", followers: "756K", image: "🏙️" }
  ];

  return (
    <div className="music-page">
      <div className="page-header">
        <h1>🎵 Music Streaming</h1>
        <p>Discover and play your favorite tracks</p>
      </div>

      <div className="music-container">
        {/* Now Playing */}
        <div className="now-playing">
          <div className="track-art">🎼</div>
          <div className="track-info">
            <h3>{playlist[currentTrack]?.title}</h3>
            <p>{playlist[currentTrack]?.artist}</p>
            <div className="progress-bar">
              <div className="progress" style={{width: '45%'}}></div>
            </div>
            <div className="time-info">
              <span>1:23</span>
              <span>{playlist[currentTrack]?.duration}</span>
            </div>
          </div>
          <div className="player-controls">
            <button className="control-btn">⏮️</button>
            <button 
              className="play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="control-btn">⏭️</button>
          </div>
        </div>

        {/* Playlist */}
        <div className="playlist-section">
          <h3>Current Playlist</h3>
          <div className="playlist">
            {playlist.map((track, index) => (
              <div 
                key={track.id} 
                className={`track-item ${index === currentTrack ? 'active' : ''}`}
                onClick={() => setCurrentTrack(index)}
              >
                <div className="track-number">{index + 1}</div>
                <div className="track-details">
                  <div className="track-title">{track.title}</div>
                  <div className="track-artist">{track.artist}</div>
                </div>
                <div className="track-genre">{track.genre}</div>
                <div className="track-duration">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Artists */}
        <div className="artists-section">
          <h3>Featured Artists</h3>
          <div className="artists-grid">
            {featuredArtists.map((artist, index) => (
              <div key={index} className="artist-card">
                <div className="artist-image">{artist.image}</div>
                <div className="artist-info">
                  <h4>{artist.name}</h4>
                  <p>{artist.followers} followers</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
