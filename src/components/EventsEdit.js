import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator_bootstrap5.min.css";
import {
  Button,
} from '@mui/material'
import EventAddnewDialog from './events/event-add-new-dialog';

const EventsEdit = () => {

  const [eventDialog, setEventDialog] = useState({ open: false, options: null });

  const handleClickOpen = () => {
    setEventDialog(prev => ({ ...prev, open: true}));
  };

  useEffect(() => {

    const initTable = async () => {

      const buttonFormatter = (cell, formatterParams, onRendered) => {
        let html = "<Button class='cell-btn'> photo </Button>";
        return html;
      }

      const delButtonFormatter = (cell, formatterParams, onRendered) => {
        let html = "<Button class='cell-btn'> delete </Button>";
        return html;
      }

      const tabledata = [
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
        { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
        { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
      ];

      const cols = [
        {
          title: "活動名稱",
          field: "event_name",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "開始時間",
          field: "event_start_time",
          sorter: "date",
          editor: "input",
          headerFilter: "input",
          sorterParams: {
            format: "yyyy/MM/dd",
            alignEmptyValues: "bottom",
          },
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "結束時間",
          field: "event_end_time",
          sorter: "date",
          editor: "input",
          headerFilter: "input",
          sorterParams: {
            format: "yyyy/MM/dd",
            alignEmptyValues: "bottom",
          },
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "地點",
          field: "event_loc",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "圖片",
          field: "event_pics",
          formatter: buttonFormatter,
        },
        {
          title: "最小年齡",
          field: "event_age_start",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "最大年齡",
          field: "event_age_end",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "價格",
          field: "event_price",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "活動說明",
          field: "event_desc",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "活動類型",
          field: "event_link",
          editor: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "活動連結",
          field: "event_link",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 150,
          editable: true,
        },
        {
          title: "刪除",
          field: "delete",
          formatter: delButtonFormatter,
          width: 150
        },
        {
          title: "ID",
          field: "event_id",
          width: 150
        },
      ];

      const table = new Tabulator("#example-table", {
        columns: cols,

        // height: window.innerHeight * 0.90,
        layoutColumnsOnNewData: true,
        layout: "fitDataFill",
        rowHeight: 40,

        pagination: "local",
        paginationSize: 100,
        paginationSizeSelector: [100, 150, 200],
        paginationCounter: "rows",

        data: tabledata, //assign data to table

        // ajaxURL: "/api/cars/list/sold",
        // ajaxResponse: async (url, params, response) => {

        //   let commentCount = [];
        //   const comment_count_req = axios.get('/api/cars/comment/getCount');

        //   await axios.all([comment_count_req]).then(axios.spread((...res) => {
        //     commentCount = res[0].data;
        //   }))

        //   return buildTableData(response, commentCount, user);
        // }
      })

    }

    initTable();
  }, [])

  return (
    <div>
      <h2>Events Edit</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '20px',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClickOpen}
        >
          ADD
        </Button>

        {eventDialog && eventDialog.open && (
        <EventAddnewDialog
          open={eventDialog.open}
          onClose={() => setEventDialog(prev => ({ ...prev, open: false }))}
        />
      )}

      </div>

      <div id="example-table"></div>
    </div>
  );
};

export default EventsEdit;
