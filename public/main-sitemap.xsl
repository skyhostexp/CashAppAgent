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
				<title>XML Sitemap | CashappAgent (Rank Math SEO)</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<style type="text/css">
					* {
						box-sizing: border-box;
					}
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #334155;
						background-color: #f0f2f5;
						margin: 0;
						padding: 40px 20px;
						-webkit-font-smoothing: antialiased;
					}
					.container {
						max-width: 1140px;
						margin: 0 auto;
						background: #ffffff;
						border-radius: 16px;
						overflow: hidden;
						box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04);
					}
					.header {
						background: #141f32;
						padding: 36px 40px 32px 40px;
						color: #ffffff;
					}
					.title-row {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 12px;
						margin-bottom: 12px;
					}
					h1 {
						color: #ffffff;
						font-size: 32px;
						margin: 0;
						font-weight: 800;
						letter-spacing: -0.02em;
						line-height: 1.1;
					}
					.badge {
						display: inline-block;
						background: #2563eb;
						color: #ffffff;
						font-size: 11px;
						font-weight: 800;
						text-transform: uppercase;
						letter-spacing: 0.06em;
						padding: 5px 12px;
						border-radius: 6px;
						line-height: 1;
					}
					.description {
						color: #cbd5e1;
						font-size: 15px;
						line-height: 1.6;
						margin: 0;
						font-weight: 400;
					}
					.description a {
						color: #60a5fa;
						text-decoration: none;
						font-weight: 700;
					}
					.description a:hover {
						text-decoration: underline;
					}
					.subbar {
						display: flex;
						align-items: center;
						justify-content: space-between;
						background: #ffffff;
						padding: 16px 40px;
						border-bottom: 1px solid #e2e8f0;
						font-size: 14px;
						flex-wrap: wrap;
						gap: 16px;
					}
					.count-text {
						color: #64748b;
						font-size: 14px;
					}
					.count-text strong {
						color: #0f172a;
						font-weight: 700;
					}
					.nav-links {
						display: flex;
						align-items: center;
						gap: 8px;
						font-size: 14px;
						font-weight: 600;
						color: #64748b;
						flex-wrap: wrap;
					}
					.nav-link {
						color: #2563eb;
						text-decoration: none;
						transition: color 0.15s;
					}
					.nav-link:hover {
						text-decoration: underline;
						color: #1d4ed8;
					}
					.nav-separator {
						color: #cbd5e1;
						margin: 0 2px;
					}
					.table-wrapper {
						width: 100%;
						overflow-x: auto;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						font-size: 14px;
						text-align: left;
					}
					thead {
						background: #ffffff;
					}
					th {
						color: #64748b;
						font-weight: 700;
						padding: 16px 20px;
						border-bottom: 1px solid #cbd5e1;
						text-transform: uppercase;
						font-size: 11px;
						letter-spacing: 0.06em;
					}
					th:first-child {
						padding-left: 40px;
						width: 60px;
					}
					th:last-child {
						padding-right: 40px;
					}
					td {
						padding: 16px 20px;
						border-bottom: 1px solid #f1f5f9;
						color: #334155;
						vertical-align: middle;
					}
					td:first-child {
						padding-left: 40px;
						color: #94a3b8;
						font-size: 13px;
						font-weight: 600;
					}
					td:last-child {
						padding-right: 40px;
					}
					tr:hover td {
						background-color: #f8fafc;
					}
					td.url-cell a {
						color: #0f172a;
						text-decoration: none;
						font-weight: 700;
						word-break: break-all;
						transition: color 0.15s;
					}
					td.url-cell a:hover {
						color: #2563eb;
						text-decoration: underline;
					}
					.freq-badge {
						display: inline-block;
						background: #e0f2fe;
						color: #0284c7;
						padding: 3px 8px;
						border-radius: 6px;
						font-size: 11px;
						font-weight: 700;
						text-transform: lowercase;
						letter-spacing: 0.02em;
					}
					.priority-cell {
						color: #2563eb;
						font-weight: 700;
						font-size: 14px;
					}
					.date-cell {
						color: #64748b;
						font-size: 13px;
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
						white-space: nowrap;
					}
					.footer {
						padding: 24px 40px;
						background: #ffffff;
						border-top: 1px solid #e2e8f0;
						text-align: center;
						font-size: 13px;
						color: #64748b;
					}
					.footer span {
						margin: 0 6px;
					}
					@media (max-width: 768px) {
						body {
							padding: 16px 8px;
						}
						.header {
							padding: 24px 20px;
						}
						.subbar {
							padding: 14px 20px;
						}
						th:first-child, td:first-child {
							padding-left: 20px;
						}
						th:last-child, td:last-child {
							padding-right: 20px;
						}
						.footer {
							padding: 18px 20px;
						}
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<div class="title-row">
							<xsl:choose>
								<xsl:when test="sitemap:sitemapindex">
									<h1>XML Sitemap Index</h1>
								</xsl:when>
								<xsl:otherwise>
									<h1>XML Sitemap</h1>
								</xsl:otherwise>
							</xsl:choose>
							<span class="badge">RANK MATH SEO</span>
						</div>
						<p class="description">
							Generated by Rank Math SEO standard schema for <a href="https://cashappagent.com/">CashappAgent.com</a> to index all verified BTC &amp; Non-BTC Cash App products.
						</p>
					</div>

					<div class="subbar">
						<div class="count-text">
							<xsl:choose>
								<xsl:when test="sitemap:sitemapindex">
									Sitemaps in this index: <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap)"/></strong>
								</xsl:when>
								<xsl:otherwise>
									URLs in this sitemap: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
								</xsl:otherwise>
							</xsl:choose>
						</div>
						<div class="nav-links">
							<a href="/sitemap_index.xml" class="nav-link">Index XML</a>
							<span class="nav-separator">|</span>
							<a href="/product-sitemap.xml" class="nav-link">Products XML</a>
							<span class="nav-separator">|</span>
							<a href="/vintage-sitemap.xml" class="nav-link">Vintage XML</a>
							<span class="nav-separator">|</span>
							<a href="/page-sitemap.xml" class="nav-link">Pages XML</a>
							<span class="nav-separator">|</span>
							<a href="/post-sitemap.xml" class="nav-link">Posts XML</a>
							<span class="nav-separator">|</span>
							<a href="/sitemap" class="nav-link">HTML Sitemap</a>
						</div>
					</div>

					<div class="table-wrapper">
						<xsl:choose>
							<!-- Case 1: Sitemap Index -->
							<xsl:when test="sitemap:sitemapindex">
								<table>
									<thead>
										<tr>
											<th>#</th>
											<th>SITEMAP</th>
											<th>LAST MODIFIED</th>
										</tr>
									</thead>
									<tbody>
										<xsl:for-each select="sitemap:sitemapindex/sitemap">
											<tr>
												<td><xsl:value-of select="position()"/></td>
												<td class="url-cell">
													<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
												</td>
												<td class="date-cell">
													<xsl:value-of select="sitemap:lastmod"/>
												</td>
											</tr>
										</xsl:for-each>
									</tbody>
								</table>
							</xsl:when>

							<!-- Case 2: URL Set (Products, Pages, Posts, Vintage) -->
							<xsl:when test="sitemap:urlset">
								<table>
									<thead>
										<tr>
											<th>#</th>
											<th>URL</th>
											<th>CHANGEFREQ</th>
											<th>PRIORITY</th>
											<th>LAST MODIFIED</th>
										</tr>
									</thead>
									<tbody>
										<xsl:for-each select="sitemap:urlset/sitemap:url">
											<tr>
												<td><xsl:value-of select="position()"/></td>
												<td class="url-cell">
													<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
												</td>
												<td>
													<xsl:choose>
														<xsl:when test="sitemap:changefreq">
															<span class="freq-badge"><xsl:value-of select="sitemap:changefreq"/></span>
														</xsl:when>
														<xsl:otherwise>
															<span class="freq-badge">daily</span>
														</xsl:otherwise>
													</xsl:choose>
												</td>
												<td class="priority-cell">
													<xsl:choose>
														<xsl:when test="sitemap:priority">
															<xsl:value-of select="sitemap:priority"/>
														</xsl:when>
														<xsl:otherwise>
															0.80
														</xsl:otherwise>
													</xsl:choose>
												</td>
												<td class="date-cell">
													<xsl:value-of select="sitemap:lastmod"/>
												</td>
											</tr>
										</xsl:for-each>
									</tbody>
								</table>
							</xsl:when>
						</xsl:choose>
					</div>

					<div class="footer">
						CashappAgent.com • 100% Verified BTC &amp; Non-BTC Cash App Accounts • Sitemaps.org Protocol 0.9 Compliant
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
