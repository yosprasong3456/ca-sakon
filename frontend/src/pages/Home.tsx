import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";
import axios from "axios";
import DataTable from "../components/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";

type Props = {};

function Home({}: Props) {
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [person, setPerson] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    setIsData(false);
    setProgress(0);
    setPerson([]);
    let result = await axios.get("http://localhost:3000/api/personHis");
    if (result.data.message === "success") {
      setLoading(false);
      setIsData(true);
      setPerson(result.data.data);
    } else {
      setLoading(false);
      setIsData(false);
    }
    console.log(result);
  };

  const stockColumns: GridColDef[] = [
    {
      headerName: "HN",
      field: "hn",
      width: 100,
    },
    {
      headerName: "เลขบัตรประชาชน",
      field: "cid",
      width: 160,
    },
    {
      headerName: "ชื่อ - นามสกุล",
      field: "name",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <p>
          {/* {titleName(row.title_code)} */}
          {row.name} {row.last_name}
        </p>
      ),
    },
    {
      headerName: "ICD10",
      field: "diagnosis_drg",
      width: 100,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <p>{row.diagnosis_drg}</p>
      ),
    },
    {
      headerName: "Action",
      field: ".",
      width: 100,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <>
          <Button variant="text" onClick={() => sendPerson(row)}>
            ส่งข้อมูล
          </Button>
        </>
      ),
    },
  ];

  const sendPerson = async (params: any) => {
    console.log(params);
    const result = await axios.post(
      "http://localhost:3000/api/sendPerson",
      params
    );
    if (result.data.message === "DONE") {
      enqueueSnackbar(`เพิ่มข้อมูล HN${params.hn} สำเร็จ!`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`เพิ่มข้อมูล HN${params.hn} ล้มเหลว!`, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Header />
      <Typography variant="h4" mt={2}>
        ผู้ป่วยรายใหม่{" "}
      </Typography>
      <Button
        variant="contained"
        sx={{ fontSize: 30, borderRadius: 3 }}
        disabled={!isData}
      >
        ส่งข้อมูล
      </Button>
      <Box m={2} />
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ textAlign: "-webkit-center" }}>
        {isData && person.length > 0 && (
          <DataTable rows={person} columns={stockColumns} />
        )}
      </Box>
    </div>
  );
}

export default Home;
