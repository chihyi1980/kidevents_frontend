import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator_bootstrap5.min.css";
import EventAddnewDialog from './events/event-add-new-dialog';
import EventUpdateDialog from './events/event-update-dialog';
import { Button, Dialog, DialogContent, TextField, CircularProgress, Box } from '@mui/material';
import dayjs from 'dayjs';

const EventsEdit = () => {
  const [eventDialog, setEventDialog] = useState({ open: false, options: null });
  const [eventUpdateDialog, setEventUpdateDialog] = useState({ open: false, options: null });
  const [locOptions, setLocOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [table, setTable] = useState(null);
  const [imageDialog, setImageDialog] = useState({ open: false, imgUrl: '' });
  const [loading, setLoading] = useState(false); // 控制loading的狀態
  const [urlInput, setUrlInput] = useState(""); // 控制輸入框內容
  const API_HOST = process.env.REACT_APP_API_HOST;

  const COLOR_LIST = ['#FDAB3D', '#FCCCFF', '#FFCB00', '#00C875', '#2B76E5', '#0086C0', '#E2445C', '#9CD326', '#5559DF', '#5797FC', '#037F4C', '#FF642E', '#C4C4C4', '#4ECCC6', '#CAB641'];

  const reloadTable = async () => {
    if (table) {
      const response = await axios.get(`${API_HOST}/api/events/list`);
      table.setData(response.data);  // 重新加载表格数据
    }
  };

  const handleClickOpen = () => {
    setEventDialog(prev => ({ ...prev, open: true }));
  };

  const handleImageClick = (imgUrl) => {
    setImageDialog({ open: true, imgUrl });
  };

  const handleImageDialogClose = () => {
    setImageDialog({ open: false, imgUrl: '' });
  };

  // 新增的處理函數：用於處理 "ADD by URL" 按鈕點擊
  const handleAddByUrl = async () => {
    if (!urlInput.trim()) {
      alert('URL 不能为空');
      return;
    }

    const requestData = { url: urlInput };

    try {
      setLoading(true); // 顯示 loading 動畫
      const response = await axios.post(`${API_HOST}/api/openai/create_by_url`, requestData);

      if (response.status === 201) {
        alert('新增成功! 別忘了 手動添加 地區 與 單位名稱!');
        reloadTable(); // 刷新表格
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      alert('Error: ' + error.response?.data?.message || '發生錯誤');
    } finally {
      setLoading(false); // 隱藏 loading 動畫
    }
  };

  useEffect(() => {
    const initOptions = async () => {
      const loc_res = await axios.get(`${API_HOST}/api/loc/list`);
      setLocOptions(loc_res.data);

      const tag_res = await axios.get(`${API_HOST}/api/tag/list`);
      setTagOptions(tag_res.data);
    }
    initOptions();
  }, [])

  useEffect(() => {
    const initTable = async () => {

      const cellTextFormatter = (text, bgColor, color = '#FFFFFF') => {
        return `<span class="cell-text" style="background-color:${bgColor}; color:${color};">${text}</span>`;
      }

      const editButtonFormatter = (cell, formatterParams, onRendered) => {
        let html = "<Button class='cell-btn'> Edit </Button>";
        return html;
      }

      const delButtonFormatter = (cell, formatterParams, onRendered) => {
        let html = "<Button class='cell-btn'> Delete </Button>";
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
          title: "是否上架",
          field: "is_online",
          editor: "tickCross",
          formatter: "tickCross",
          hozAlign: "center",
          cellEdited: async function (cell) {

            const is_online = cell.getValue();
            const { _id } = cell.getData();

            try {
              // 从 localStorage 中获取 token
              const token = localStorage.getItem('token');

              // 设置请求头
              const config = {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              };

              let newEvent = {};
              newEvent['is_online'] = is_online;

              const res = await axios.put(`${API_HOST}/api/events/${_id}`, newEvent, config);

              console.log('Data put successfully:', res.data);
            } catch (error) {
              console.error('Error put data:', error);
              alert('Error put data:', '請重新登入');
            }

          },
          editable: true,
        },
        {
          title: "編輯活動",
          field: "edit_event",
          formatter: editButtonFormatter,
          cellClick: function (e, cell) {
            const { _id } = cell.getData();
            setEventUpdateDialog(prev => ({ ...prev, open: true, event_id: _id }));
          },
        },
        {
          title: "活動名稱",
          field: "event_name",
          editor: "input",
          headerFilter: "input",
          editable: false,
        },
        {
          title: "活動連結",
          field: "event_link",
          editor: "input",
          headerFilter: "input",
          editable: false,
          formatter: function (cell, formatterParams, onRendered) {
            let value = cell.getValue();
            if (value) {
              return `<button class='view-image-btn' onclick='window.open("${value}", "_blank")'>查看連結</button>`;
            }
            return "";
          },
        },
        {
          title: "圖片",
          field: "event_img",
          formatter: function (cell, formatterParams, onRendered) {
            let value = cell.getValue();
            if (value) {
              return `<button class="view-image-btn">查看圖片</button>`;
            } else {
              return "無圖片";
            }
          },
          cellClick: function (e, cell) {
            let imgUrl = cell.getValue();
            if (imgUrl && imgUrl.indexOf(',') != -1) {
              imgUrl = imgUrl.split(',')[0];
              console.log(imgUrl);
            }
            if (imgUrl) {
              handleImageClick(imgUrl);  // 打开图片对话框
            }
          },
        },
        {
          title: "活動單位",
          field: "event_org",
          editor: "input",
          headerFilter: "input",
          editable: false,
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
          editable: false,
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
          editable: false,
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
          editable: false,
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
          editable: false,
        },
        {
          title: "最小年齡",
          field: "event_min_age",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: false,
        },
        {
          title: "最大年齡",
          field: "event_max_age",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: false,
        },
        {
          title: "價格",
          field: "event_price",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          editable: false,
        },
        {
          title: "活動說明",
          field: "event_content",
          editor: "input",
          headerFilter: "input",
          cellEdited: function (cell) {
          },
          width: 300,
          editable: false,
        },
        {
          title: "ID",
          field: "_id",
          width: 150
        },
        {
          title: "刪除",
          field: "delete",
          formatter: delButtonFormatter,
          cellClick: async function (e, cell) {
            const { event_name, _id } = cell.getData();
            let text = `是否確定刪除活動 : ${event_name} ?`;

            // 禁用 ESLint 对于 'confirm' 的警告
            // eslint-disable-next-line no-restricted-globals
            if (confirm(text) == true) {
              const row = cell.getRow();
              row.delete();

              try {
                // 从 localStorage 中获取 token
                const token = localStorage.getItem('token');

                // 设置请求头
                const config = {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                };

                let newEvent = {};
                newEvent['is_enabled'] = false;

                const res = await axios.put(`${API_HOST}/api/events/${_id}`, newEvent, config);

                console.log('Data put successfully:', res.data);
              } catch (error) {
                console.error('Error put data:', error);
                alert('Error put data:', '請重新登入');
              }
            }
          },
        },
      ];

      const table = new Tabulator("#example-table", {
        columns: cols,
        layout: "fitDataFill",
        pagination: "local",
        paginationSize: 100,
        ajaxURL: `${API_HOST}/api/events/list`,
      });
      setTable(table);
    }
    initTable();
  }, [tagOptions]);

  return (
    <div>
      <h2>Events Edit</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
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

        {eventUpdateDialog && eventUpdateDialog.open && (
          <EventUpdateDialog
            open={eventUpdateDialog.open}
            onClose={() => {
              setEventUpdateDialog(prev => ({ ...prev, open: false }));
              reloadTable();
            }}
            locOptions={locOptions}
            tagOptions={tagOptions}
            event_id={eventUpdateDialog.event_id}
          />
        )}
      </div>

      {/* 新增 URL 文字輸入框和按鈕 */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddByUrl}
          disabled={loading} // 在loading期間禁用按鈕
        >
          ADD by URL
        </Button>
        <TextField
          label="URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </Box>

      <div id="example-table"></div>

      {/* 圖片對話框 */}
      <Dialog open={imageDialog.open} onClose={handleImageDialogClose}>
        <DialogContent>
          <img src={imageDialog.imgUrl} alt="活動圖片" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>

      {/* 加载中动画 */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default EventsEdit;
