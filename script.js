const SHEET_JSON_URL = "https://docs.google.com/spreadsheets/d/1ZM_eN_XKNl4YFvVzJpbNgZlJjUbrx3qtlVqagKLcHkE/gviz/tq?tqx=out:json";

fetch(SHEET_JSON_URL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2)); // 구글 특유의 포맷 제거
    const table = json.table;

    const thead = document.querySelector("#scoreboard thead");
    const tbody = document.querySelector("#scoreboard tbody");

    // 헤더
    const headerRow = document.createElement("tr");
    table.cols.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col.label;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // 데이터
    table.rows.forEach(row => {
      const tr = document.createElement("tr");
      row.c.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell?.v ?? '';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error("데이터 로딩 실패", err);
  });
