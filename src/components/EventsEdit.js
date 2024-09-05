import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator_bootstrap5.min.css";
import {
  Button,
} from '@mui/material'
import EventAddnewDialog from './events/event-add-new-dialog';
import dayjs from 'dayjs';

const EventsEdit = () => {

  const [eventDialog, setEventDialog] = useState({ open: false, options: null });
  const [locOptions, setLocOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [table, setTable] = useState(null);
  const COLOR_LIST = ['#FDAB3D', '#FCCCFF', '#FFCB00', '#00C875', '#2B76E5', '#0086C0', '#E2445C', '#9CD326', '#5559DF', '#5797FC', '#037F4C', '#FF642E', '#C4C4C4', '#4ECCC6', '#CAB641'];

  const reloadTable = async () => {
    if (table) {
      const response = await axios.get('http://localhost:5000/api/events/list');
      table.setData(response.data);  // 重新加载表格数据
      console.log('reload!');
    }
  };

  const handleClickOpen = () => {
    setEventDialog(prev => ({ ...prev, open: true }));
  };

  useEffect(() => {
    const initOptions = async () => {
      const loc_res = await axios.get('http://localhost:5000/api/loc/list');
      const loc_options = loc_res.data;
      setLocOptions(loc_options);

      const tag_res = await axios.get('http://localhost:5000/api/tag/list');
      const tag_options = tag_res.data;
      setTagOptions(tag_options);

    }
    initOptions();
  }, [])

  useEffect(() => {

    const initTable = async () => {

      const cellTextFormatter = (text, bgColor, color = '#FFFFFF') => {
        return `<span class="cell-text" style="background-color:${bgColor}; color:${color};">${text}</span>`;
      }

      const buttonFormatter = (cell, formatterParams, onRendered) => {
        let html = "<Button class='cell-btn'> photo </Button>";
        return html;
      }

      const delButtonFormatter = (cell, formatterParams, onRendered) => {
        let html = "<Button class='cell-btn'> delete </Button>";
        return html;
      }

      const getList = (items) => {
        let newList = [];
        items.map((item) => (
          newList.push({
            value: item._id,
            label: item.value
          })
        ));
        return newList;

      }

      const cols = [
        {
          title: "活動名稱",
          field: "event_name",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "開始時間",
          field: "event_start_date",
          sorter: "date",
          editor: "input",
          headerFilter: "input",
          sorterParams: {
            format: "yyyy/MM/dd",
            alignEmptyValues: "bottom",
          },
          cellEdited: function (cell) {
          },
          formatter: function (cell, formatterParams, onRendered) {
            // 取得儲存格的值
            var value = cell.getValue();

            // 檢查值是否存在
            if (value) {
              // 使用 dayjs 格式化日期為 yy/MM/dddd
              var formattedDate = dayjs(value).format('YYYY/MM/DD');
              return formattedDate;
            } else {
              return "";
            }
          },
          editable: true,
        },
        {
          title: "結束時間",
          field: "event_end_date",
          sorter: "date",
          editor: "input",
          headerFilter: "input",
          sorterParams: {
            format: "yyyy/MM/dd",
            alignEmptyValues: "bottom",
          },
          cellEdited: function (cell) {
          },
          formatter: function (cell, formatterParams, onRendered) {
            // 取得儲存格的值
            var value = cell.getValue();

            // 檢查值是否存在
            if (value) {
              // 使用 dayjs 格式化日期為 yy/MM/dddd
              var formattedDate = dayjs(value).format('YYYY/MM/DD');
              return formattedDate;
            } else {
              return "";
            }
          },
          editable: true,
        },
        {
          title: "地點",
          field: "event_loc",
          editor: "list",
          headerFilter: true,
          headerFilterFunc: "in",
          headerFilterParams: {
            multiselect: true,
            values: getList(locOptions)
          },

          cellEdited: function (cell) {

          },
          editorParams:
          {
            autocomplete: "true",
            allowEmpty: true,
            listOnEmpty: true,
            valuesLookup: true,
            values: getList(locOptions)
          },
          formatter: (cell) => {
            let value = cell.getValue();
            if (value) {

              // 使用正則表達式提取所有數字
              const numbers = value.match(/\d/g);

              // 將提取出的數字轉換為整數並加總
              const sum = numbers.reduce((acc, num) => acc + parseInt(num, 10), 0);

              const num = sum % COLOR_LIST.length;

              // 篩選出 locOptions 中 _id 等於 value 的項目
              const matchedOption = locOptions.find(option => option._id === value);
              // 確認是否找到匹配的項目
              const text = matchedOption ? matchedOption.value : '';

              const bgColor = COLOR_LIST[num];
              return cellTextFormatter(text, bgColor, '#FFFFFF')
            } else {
              return '';
            }
          },
        },
        {
          title: "活動類型",
          field: "event_tag_ids",
          editor: "list",
          headerFilter: true,
          headerFilterFunc: "in",
          headerFilterParams: {
            multiselect: true,
            values: getList(tagOptions)
          },

          cellEdited: function (cell) {

          },
          editorParams:
          {
            autocomplete: "true",
            allowEmpty: true,
            listOnEmpty: true,
            valuesLookup: true,
            values: getList(tagOptions)
          },
          formatter: (cell) => {
            const ids = cell.getValue();
            let html = '';

            if (ids?.length > 0) {
              ids.forEach(id => {

                // 使用正則表達式提取所有數字
                const numbers = id.match(/\d/g);

                // 將提取出的數字轉換為整數並加總
                const sum = numbers.reduce((acc, num) => acc + parseInt(num, 10), 0);

                const num = sum % COLOR_LIST.length;

                // 篩選出 locOptions 中 _id 等於 value 的項目
                const matchedOption = tagOptions.find(option => option._id === id);
                // 確認是否找到匹配的項目
                const text = matchedOption ? matchedOption.value : '';

                const bgColor = COLOR_LIST[num];
                html += cellTextFormatter(text, bgColor, '#FFFFFF');

              });


            }

            return html;
          },
        },
        {
          title: "最小年齡",
          field: "event_min_age",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "最大年齡",
          field: "event_max_age",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "價格",
          field: "event_price",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: true,
        },
        {
          title: "活動說明",
          field: "event_content",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 300,
          editable: true,
        },
        // {
        //   title: "圖片",
        //   field: "event_img",
        //   formatter: function (cell, formatterParams, onRendered) {
        //     // 取得儲存格的值
        //     var value = cell.getValue();

        //     // 檢查值是否存在
        //     if (value) {
        //       let html = "<img src=" + value + " width='300px'>";
        //       return html;
        //     } else {
        //       return "";
        //     }
        //   },
        // },
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
        },
        {
          title: "ID",
          field: "_id",
          width: 150
        },
      ];

      const table = new Tabulator("#example-table", {
        columns: cols,

        // height: window.innerHeight * 0.90,
        layoutColumnsOnNewData: true,
        layout: "fitDataFill",
        // rowHeight: 40,

        pagination: "local",
        paginationSize: 100,
        paginationSizeSelector: [100, 150, 200],
        paginationCounter: "rows",

        ajaxURL: "http://localhost:5000/api/events/list",
      });
      setTable(table);

    }
    initTable();
  }, [tagOptions])

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
            onClose={() => {
              setEventDialog(prev => ({ ...prev, open: false }));
              reloadTable();
            }}
            locOptions={locOptions}
            tagOptions={tagOptions}
          />
        )}

      </div>

      <div id="example-table"></div>
    </div>
  );
};

export default EventsEdit;
