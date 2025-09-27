import React, { useState, useEffect } from 'react';
import styles from './Scoreboard.module.css';

const Scoreboard = ({ players, currentPlayer, gameStartTime, gameEndTime, started }) => {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (!started || !gameEndTime) return;

        const updateTimer = () => {
            const now = Date.now();
            const remaining = Math.max(0, gameEndTime - now);
            setRemainingTime(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [gameEndTime, started]);

    if (!players) return null;

    const activePlayers = players.filter(player => player.name && player.name !== '...');
    
    // Sort players by score (highest first)
    const sortedPlayers = [...activePlayers].sort((a, b) => {
        const scoreA = a.playerScore || 0;
        const scoreB = b.playerScore || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        // Tie-breaker: most captures
        return (b.captures || 0) - (a.captures || 0);
    });

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const isWarning = remainingTime <= 60000 && remainingTime > 0;

    return (
        <div className={styles.scoreboard}>
            {started && gameEndTime && (
                <div className={`${styles.timer} ${isWarning ? styles.timerWarning : ''}`}>
                    <div className={styles.timerLabel}>⏰ Time Left</div>
                    <div className={styles.timerValue}>
                        {remainingTime > 0 ? formatTime(remainingTime) : '0:00'}
                    </div>
                </div>
            )}
            
            <h3 className={styles.title}>Live Scores</h3>
            
            {sortedPlayers.length === 0 ? (
                <div className={styles.empty}>No players yet</div>
            ) : (
                sortedPlayers.map((player, index) => (
                    <div 
                        key={player.color} 
                        className={`${styles.playerItem} ${
                            player.color === currentPlayer ? styles.currentPlayer : ''
                        }`}
                    >
                        <div className={styles.rankIndicator}>
                            #{index + 1}
                        </div>
                        <div className={styles.playerInfo}>
                            <div 
                                className={styles.colorIndicator}
                                style={{ backgroundColor: player.color }}
                            ></div>
                            <span className={styles.playerName}>
                                {player.name}
                            </span>
                            {(player.captures || 0) > 0 && (
                                <span className={styles.captureCount}>
                                    🎯 {player.captures}
                                </span>
                            )}
                        </div>
                        <div className={styles.playerScore}>
                            {player.playerScore || 0} pts
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Scoreboard;