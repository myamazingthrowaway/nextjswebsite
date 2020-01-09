import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => console.log(`clicked the card!`)}>
        <CardMedia
          component="img"
          alt="Hideout.tv"
          height="140"
          image="/images/cards/hideout.jpg"
          title="Hideout.tv"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Hideout.tv
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Earn rewards for watching videos. Redeem them for nextjswebsite points!
            It's really that simple
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
