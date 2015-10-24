/**
 * filterForTable
 *
 *  This plugin will add a searching filter to the table.
 *  If cell has formated number values, plugin will transform them to simple numbers and 
 *  will compare with filter value. So if enter in filter input 1500, 
 *  script will show 1 500, 1500, 1,500, $1 500, %1 500 and so on.
 *
 * @version v1.0.0
 * @author Alex Ya, alex.yaromenko@gmail.com
 * @license MIT
 */
(function ($) {

    $.fn.filterForTable = function (options) {
        var defaults = {
            searchSelector: '#searchInput',
            minChars: 1,
            minRows: 1,
            emptyMsg: 'No data found',
            emptyTrId: 'filterForTableEmptyRow',
            exceptClass: ''
        };

        var settings = $.extend({}, defaults, options);

        var input = $(settings.searchSelector);

        var doFiltering = function (table, query) {
            hideFooter();
            var tbody = table.find('tbody');
            var tr_list = tbody.find('tr');

            var shownRows = 0;
            tr_list.each(function () {
                tr = $(this);
                var showTr = false;

                if (settings.exceptClass != '' && tr.hasClass(settings.exceptClass)) {
                    showTr = true;
                } else {
                    tr.find('td').each(function () {
                        td = $(this);
                        var str = td.text();
                        if (td.attr('data-filter')) {
                            str = td.data('filter');
                        }
                        
                        if (checkMatch(str, query)) {
                            showTr = true;
                        }
                    });
                }

                if (showTr) {
                    tr.show();
                    shownRows++;
                } else {
                    tr.hide();
                }
            });

            if (shownRows == 0) {
                showFooter(table);
            }
        };

        var checkMatch = function (str1, str2) {
            if (str1.toUpperCase().indexOf(str2.toUpperCase()) >= 0) {
                return true;
            }

            str1 = formatIfNumber(str1);
            str2 = formatIfNumber(str2);

            if (str1.toUpperCase().indexOf(str2.toUpperCase()) >= 0) {
                return true;
            }

            return false;
        };

        var formatIfNumber = function (str) {
            query = str.replace(/[-+$%, ]/g, '');
            if (!isNumeric(query)) {
                query = str;
            }

            return query;
        }

        var hideFooter = function () {
            $('#' + settings.emptyTrId).remove();
        }

        var showFooter = function (table) {
            var columns = table.find('thead tr td').length;
            table.find('tbody').append('' +
                '<tr id="' + settings.emptyTrId + '"><td colspan="' + columns + '">' + settings.emptyMsg + '</td></tr>'
            );
        };

        var isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        return this.each(function () {
            t = $(this);
            input.on("keyup", function () {
                if (
                    t.find('tbody tr').length >= settings.minRows &&
                    (this.value.length == 0 ||
                    this.value.length >= settings.minChars)
                ) {
                    doFiltering(t, this.value)
                }
            });
        });
    };

}(jQuery));