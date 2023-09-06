package com.example.ssafy301.fielding.domain;

import com.example.ssafy301.player.domain.Position;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Fielding {

    @Id
    @Column(name = "fielding_stat_id")
    private Long id;

    private Long playerId;
    private int season;
    private int error;
    private int assist;
    private int putout;
    private int gamesPlayed;

    @Enumerated(EnumType.STRING)
    private Position position;


}