(function() {
  var KEY = 'cw_access_2026';
  var HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'; // sha256 of 'admin'
  // To change the password, replace HASH with sha256 of your new password.
  // Current password: contextweaver

  // Override HASH with the actual password hash
  HASH = 'a]CTXWVR2026';  // not a real hash — we do direct compare below

  var PASS = 'contextweaver2026';

  if (sessionStorage.getItem(KEY) === 'granted') return;

  // Block page rendering
  document.documentElement.style.visibility = 'hidden';
  document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.style.visibility = 'hidden';
    document.body.style.visibility = 'hidden';

    var overlay = document.createElement('div');
    overlay.id = 'cw-gate';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(135deg,#0a0e14 0%,#1a1f2e 50%,#0d1117 100%);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;visibility:visible';
    overlay.innerHTML = '<div style="text-align:center;max-width:360px;padding:40px">'
      + '<div style="font-size:3rem;margin-bottom:16px">\uD83E\uDDE0</div>'
      + '<h2 style="color:#e6edf3;margin:0 0 6px;font-size:1.4rem;font-weight:700">ContextWeaver</h2>'
      + '<p style="color:rgba(255,255,255,0.4);font-size:.82rem;margin:0 0 24px">This site is currently private. Enter the access code to continue.</p>'
      + '<input id="cw-gate-pw" type="password" placeholder="Access code" autofocus '
      + 'style="width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(13,202,240,0.3);background:rgba(255,255,255,0.05);color:#e6edf3;font-size:1rem;outline:none;text-align:center;box-sizing:border-box">'
      + '<div id="cw-gate-err" style="color:#dc3545;font-size:.78rem;margin-top:8px;min-height:20px"></div>'
      + '<button id="cw-gate-btn" style="margin-top:8px;padding:10px 32px;border-radius:10px;border:none;background:linear-gradient(135deg,#0dcaf0,#0d6efd);color:#fff;font-size:.9rem;font-weight:600;cursor:pointer;width:100%">Enter</button>'
      + '<p style="color:rgba(255,255,255,0.15);font-size:.65rem;margin-top:24px">\u00A9 2026 BrainzBytes LLC</p>'
      + '</div>';
    document.body.appendChild(overlay);

    function tryAccess() {
      var val = document.getElementById('cw-gate-pw').value;
      if (val === PASS) {
        sessionStorage.setItem(KEY, 'granted');
        overlay.remove();
        document.documentElement.style.visibility = '';
        document.body.style.visibility = '';
      } else {
        document.getElementById('cw-gate-err').textContent = 'Invalid access code';
        document.getElementById('cw-gate-pw').value = '';
        document.getElementById('cw-gate-pw').focus();
      }
    }

    document.getElementById('cw-gate-btn').addEventListener('click', tryAccess);
    document.getElementById('cw-gate-pw').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') tryAccess();
    });
  });
})();
