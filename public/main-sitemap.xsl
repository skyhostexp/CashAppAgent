<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap Index | Rank Math SEO - CashappAgent</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background-color: #f1f5f9;
            margin: 0;
            padding: 40px 16px;
            display: flex;
            justify-content: center;
          }
          #sitemap-container {
            width: 100%;
            max-width: 960px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
            border: 1px solid #cbd5e1;
            overflow: hidden;
          }
          #header {
            background-color: #141d2e;
            padding: 32px 36px;
            color: #ffffff;
          }
          h1 {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 10px 0;
            display: flex;
            align-items: center;
            gap: 12px;
            letter-spacing: -0.5px;
          }
          .badge {
            background-color: #2563eb;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 6px;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }
          p.desc {
            font-size: 14px;
            color: #cbd5e1;
            margin: 0;
            line-height: 1.6;
          }
          p.desc a {
            color: #38bdf8;
            text-decoration: none;
            font-weight: 700;
          }
          p.desc a:hover {
            text-decoration: underline;
          }
          #sub-nav {
            background-color: #f0f4f9;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
            padding: 12px 36px;
            font-size: 13px;
            color: #475569;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          #sub-nav .links a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 700;
            margin: 0 4px;
          }
          #sub-nav .links a:hover {
            text-decoration: underline;
          }
          #content {
            padding: 24px 36px 36px 36px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            color: #64748b;
            font-weight: 700;
            text-align: left;
            padding: 14px 16px;
            border-bottom: 2px solid #e2e8f0;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.6px;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
            color: #334155;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          td a {
            color: #0f172a;
            text-decoration: none;
            font-weight: 700;
            word-break: break-all;
          }
          td a:hover {
            color: #2563eb;
            text-decoration: underline;
          }
          .col-num {
            width: 40px;
            color: #94a3b8;
            font-weight: 600;
          }
          .date-col {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            color: #64748b;
            font-size: 12px;
          }
          .count-badge {
            background: #e2e8f0;
            color: #334155;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            display: inline-block;
          }
          .footer {
            background-color: #f8fafc;
            padding: 16px 36px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #64748b;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div id="sitemap-container">
          <div id="header">
            <h1>XML Sitemap Index <span class="badge">RANK MATH SEO</span></h1>
            <p class="desc">
              Generated by Rank Math SEO standard schema for <a href="https://cashappagent.com/">CashappAgent.com</a> to index all verified Cash App (BTC &amp; Non-BTC) accounts.
            </p>
          </div>

          <div id="sub-nav">
            <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
              <div>Sitemaps in this index: <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong></div>
              <div class="links">
                <a href="https://cashappagent.com/sitemap_index.xml">Index XML</a> | 
                <a href="https://cashappagent.com/product-sitemap.xml">Products XML</a> | 
                <a href="https://cashappagent.com/page-sitemap.xml">Pages XML</a> | 
                <a href="https://cashappagent.com/post-sitemap.xml">Posts XML</a>
              </div>
            </xsl:if>
            <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
              <div>URLs in this sitemap: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></div>
              <div class="links">
                <a href="https://cashappagent.com/sitemap_index.xml">&larr; Return to Index</a>
              </div>
            </xsl:if>
          </div>

          <div id="content">
            <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
              <table>
                <thead>
                  <tr>
                    <th class="col-num">#</th>
                    <th>SITEMAP</th>
                    <th>LAST MODIFIED</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td class="col-num"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td class="date-col">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:if>

            <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
              <table>
                <thead>
                  <tr>
                    <th class="col-num">#</th>
                    <th>URL</th>
                    <th>IMAGES</th>
                    <th>CHANGEFREQ</th>
                    <th>PRIORITY</th>
                    <th>LAST MODIFIED</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td class="col-num"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td>
                        <span class="count-badge"><xsl:value-of select="count(image:image)"/></span>
                      </td>
                      <td class="date-col">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </td>
                      <td>
                        <strong><xsl:value-of select="sitemap:priority"/></strong>
                      </td>
                      <td class="date-col">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:if>
          </div>

          <div class="footer">
            CashappAgent.com &bull; 100% Verified Cash App Accounts &bull; Sitemaps.org Protocol 0.9 Compliant
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
