import React, { useState, useMemo } from "react";
import { IReservation } from "../models/IReservation";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  TextField,
  InputLabel,
  Chip,
  Avatar,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { DateTimePicker } from "@material-ui/pickers";
import { IFacility } from "../models/IFacility";

const dummyFacilities: IFacility[] = [
  {
    id: "01",
    name: "設備００１",
    system: {} as any,
    note: "",
  },
  {
    id: "02",
    name: "設備００２",
    system: {} as any,
    note: "",
  },
  {
    id: "03",
    name: "設備００３",
    system: {} as any,
    note: "",
  },
];

const initResevation: IReservation = {
  id: "001",
  facilityId: "001",
  subject: "目的01",
  description: "",
  startDate: dayjs(),
  endDate: dayjs(1, "hour"),
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
  paper: {
    padding: theme.spacing(1),
    "& > div": {
      marginButtom: theme.spacing(2),
    },
  },
  rightActions: {
    textAlign: "right",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Reservation: React.FC = () => {
  const style = useStyle();
  const { errors, control } = useForm<IReservation>({
    defaultValues: initResevation,
    mode: "onBlur",
  });
  const [facilities] = useState<IFacility[]>(dummyFacilities);
  const facilityMenuItems = useMemo(() => {
    return facilities.map((f) => (
      <MenuItem key={f.id} value={f.id}>
        {f.name}
      </MenuItem>
    ));
  }, [facilities]);
  const { system } = initResevation;
  return (
    <Container maxWidth="sm">
      <Paper className={style.paper}>
        <FormControl>
          <InputLabel id="facility-label">設備</InputLabel>
          <Controller
            name="facilityId"
            control={control}
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <Select
                labelId="facility-label"
                value={value}
                onChange={onChange}
              >
                {facilityMenuItems}
              </Select>
            )}
          />
        </FormControl>
        <div style={{ display: "flex" }}>
          <Controller
            control={control}
            name="startDate"
            render={(data) => {
              return (
                <DateTimePicker
                  value={data.value}
                  onChange={data.onChange}
                  label="開始日時"
                  format="YYYY/MM/DD HH:mm"
                  ampm={false}
                  minutesStep={15}
                />
              );
            }}
          />
          <p>～</p>
          <Controller
            control={control}
            name="endDate"
            render={(data) => {
              return (
                <DateTimePicker
                  value={data.value}
                  onChange={data.onChange}
                  onBlur={data.onBlur}
                  label="終了日時"
                  format="YYYY/MM/DD HH:mm"
                  ampm={false}
                  minutesStep={15}
                />
              );
            }}
          />
        </div>
        <Controller
          control={control}
          name="subject"
          rules={{ required: true }}
          as={
            <TextField
              label="目的"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject ? "必須です" : ""}
            />
          }
        />
        <Controller
          control={control}
          name="description"
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
