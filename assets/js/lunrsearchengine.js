---
layout: null
sitemap: false
---

(function () {
  {% assign counter = 0 %}
  var documents = [
    {% for page in site.pages %}
      {% if page.url contains '.xml' or page.url contains 'assets' or page.url contains 'category' or page.url contains 'tag' %}
      {% else %}
        {
          "id": {{ counter }},
          "url": "{{ site.baseurl }}{{ page.url }}",
          "title": {{ page.title | jsonify }},
          "body": {{ page.content | markdownify | strip_html | strip_newlines | truncate: 1500 | jsonify }}
        },
        {% assign counter = counter | plus: 1 %}
      {% endif %}
    {% endfor %}
    {% for page in site.posts %}
      {
        "id": {{ counter }},
        "url": "{{ site.baseurl }}{{ page.url }}",
        "title": {{ page.title | jsonify }},
        "date": "{{ page.date | date: '%Y.%m.%d' }}",
        "body": {{ page.content | markdownify | strip_html | strip_newlines | truncate: 1500 | jsonify }}
      }{% unless forloop.last %},{% endunless %}
      {% assign counter = counter | plus: 1 %}
    {% endfor %}
  ];

  var idx = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('body');
    var self = this;
    documents.forEach(function (doc) { self.add(doc); });
  });

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  window.runLunrSearch = function (term) {
    var container = document.getElementById('lunr-results');
    if (!container) return false;

    if (!term || !term.trim()) {
      container.innerHTML = '';
      return false;
    }

    var results;
    try {
      results = idx.search(term);
    } catch (e) {
      results = idx.search(term.replace(/[+\-:^~*]/g, ' '));
    }

    if (!results.length) {
      container.innerHTML = '<p style="color: var(--text-muted); padding: 20px 0;">검색 결과가 없습니다.</p>';
      return false;
    }

    var html = '<ul>';
    results.slice(0, 20).forEach(function (r) {
      var doc = documents[r.ref];
      if (!doc) return;
      var snippet = (doc.body || '').substring(0, 140);
      html += '<li>' +
        '<a href="' + escapeHtml(doc.url) + '">' + escapeHtml(doc.title) + '</a>' +
        (doc.date ? '<span class="snippet" style="font-size:.78rem;opacity:.7">' + escapeHtml(doc.date) + '</span>' : '') +
        '<span class="snippet">' + escapeHtml(snippet) + '…</span>' +
      '</li>';
    });
    html += '</ul>';
    container.innerHTML = html;
    return false;
  };
})();
