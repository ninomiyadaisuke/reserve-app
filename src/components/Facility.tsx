import React, { useState, useCallback, ChangeEvent } from "react";
import { IFacility } from "../models/IFacility";
import {
  Container,
  Paper,
  TextField,
  InputLabel,
  Chip,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

const initFacility: IFacility = {
  id: "",
  name: "name の初期値",
  note: "note の初期値",
  system: {
    createDate: new Date(),
    createUser: {
      displayName: "ebihara kenji",
      email: "",
      face: "",
    },
    lastUpdateUser: {
      displayName: "ebihara kenji",
      email: "",
      face: "",
    },
    lastUpdate: new Date(),
  },
};

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  rightActions: {
    textAlign: "right",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  const { register, errors, control } = useForm({
    defaultValues: initFacility,
    mode: "onBlur",
  });

  const { system } = initFacility;
  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          as={
            <TextField
              label="設備名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? "必須です" : ""}
            />
          }
        />
        <Controller
          control={control}
          name="note"
          as={<TextField label="詳細" fullWidth multiline value="" />}
        />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format("YYYY-MM-DD HH:mm")}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(new Date()).format("YYYY-MM-DD HH:mm")}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
