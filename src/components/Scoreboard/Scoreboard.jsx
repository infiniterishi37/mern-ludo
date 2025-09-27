import React from 'react';
import styles from './Scoreboard.module.css';

const Scoreboard = ({ players, currentPlayer}) => {
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

    return (
        <div className={styles.scoreboard}>
            <h3 className={styles.title}>Live Scores</h3>
            {/* <h4 className={styles.timer}>{timer} : {Math.floor(timer / 3600000)} : {Math.floor(timer / 60000) % 60} : {Math.floor(timer / 1000) % 60}</h4> */}
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