// ==UserScript==
// @name         FreedCamp - Nicer copyable links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy full issue links in FreedCamp instead of just the title
// @author       Matt Carter <m@ttcarter.com>
// @match        https://freedcamp.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	function fcCopyReference() {
		var issue = { // Details about this issue
			id: $('.ItemCommentsPage--fk-ItemCommentsPage-Content .issue_id').text(),
			title: $('.ItemCommentsPage--fk-ItemCommentsPage-Content .ItemBasicFields--fk-ItemBasicFields-Title').text(),
			url: window.location.href,
		};

		if (!issue.id) return alert('Cannot find FreedCamp issue within page');

		var html =
			'<div>'
				+ `<a href="${issue.url}">`
					+ '<strong>'
						+ issue.id
					+ '</strong>'
				+ '</a>'
				+ ' - '
				+ issue.title
			+ '</div>';

		navigator.clipboard.write([
			new ClipboardItem({
				'text/plain': new Blob([$(html).text()], {type: 'text/plain'}), // Create plain-text version without HTML
				'text/html': new Blob([html], {type: 'text/html'}),
			})
		]);
	}

	$('body').on(
		'click',
		'.ItemCommentsPage--fk-ItemCommentsPage-Content .EditableContentLink--fk-EditableContentLink-CopyIcon',
		e => {
			console.log('INTERCEPT COPY');
			fcCopyReference();
		});

	console.log('%cFreedCamp - Nicer copyable links', 'color: blue', 'Started');
})();
