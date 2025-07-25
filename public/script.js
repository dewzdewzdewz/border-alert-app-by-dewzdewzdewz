const map = L.map('map').setView([15.87, 100.99], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const socket = io();
const markerMap = {};

fetch('/reports')
  .then(res => res.json())
  .then(data => data.forEach(showMarker));

socket.on('newReport', showMarker);
socket.on('updateReport', id => {
  fetch(`/reports/${id}`)
    .then(res => res.json())
    .then(report => {
      const marker = markerMap[id];
      if (!marker) return;
      const updatedPopup = buildPopup(report);
      marker.setPopupContent(updatedPopup);
      marker.openPopup();
    });
});
socket.on('deleteReport', id => {
  if (markerMap[id]) {
    map.removeLayer(markerMap[id]);
    delete markerMap[id];
  }
});

function showMarker(report) {
  const marker = L.marker([report.lat, report.lng]).addTo(map);
  markerMap[report.id] = marker;

  const popupHtml = buildPopup(report);
  marker.bindPopup(popupHtml);
}

function editReport(id) {
  const currentMarker = markerMap[id];
  if (!currentMarker) return;

  fetch(`/reports/${id}`)
    .then(res => res.json())
    .then(report => {
      const news = prompt("แก้ไขข้อความข่าว:", report.news);
      if (news === null) return;

      const link = prompt("แก้ไขลิงก์ข่าว (ถ้ามี):", report.link || '');

      const data = { news, link };

      fetch(`/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    })
    .catch(error => {
      console.error("เกิดข้อผิดพลาดในการโหลดรายงาน:", error);
      alert("โหลดข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง");
    });
}

function deleteReport(id) {
  if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหมุดนี้?")) return;
  fetch(`/reports/${id}`, { method: 'DELETE' });
}

map.on('click', function (e) {
  const news = prompt("กรุณาใส่ข้อความข่าว:");
  if (!news) return;
  const link = prompt("ใส่ลิงก์ข่าว (ถ้ามี):") || '';
  const data = { lat: e.latlng.lat, lng: e.latlng.lng, news, link };

  fetch('/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
});

function searchPlace() {
  const query = document.getElementById('searchBox').value;
  if (!query) return;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(results => {
      if (results.length === 0) {
        alert("ไม่พบสถานที่");
        return;
      }

      const lat = results[0].lat;
      const lon = results[0].lon;
      map.setView([lat, lon], 10);
    });
}

function buildPopup(report) {
  const popupHtml = `
    <div class="popup-container">
      <h4>📍 ข่าวรายงาน</h4>
      <p>${report.news}</p>
      ${report.link ? `<a href="${report.link}" target="_blank">🔗 อ่านข่าว</a><br>` : ''}
      <div style="margin-top: 10px; display: flex; gap: 8px;">
        <button class="edit-button" onclick="editReport(${report.id})">✏️ แก้ไข</button>
        <button class="delete-button" onclick="deleteReport(${report.id})">🗑️ ลบ</button>
      </div>
    </div>
  `;
  return popupHtml;
}

