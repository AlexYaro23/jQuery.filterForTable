# jQuery Filter For Table Plugin

This plugin makes searching and filtering in HTML tables.
If cell has formated number values, plugin will transform them to simple number and 
will compare with the filter value. So if to enter in filter something like 1500, 
script will show rows with values like 1 500, 1500, 1,500, $1 500, %1 500 and so on.

Demoes: 

## Usage

Include the dependencies:

<script src="/path/to/jquery.js"></script>
<script src="/path/to/filterForTable.js"></script>
<script>
$('table').filterForTable(); // basic usage

$('table').filterForTable({searchSelector: '.search-input'}); //selecting search input

</script>

## Options

$('table').filterForTable({*option*: *'value'*});
Options list: 

- searchSelector - selecting search input 
	Values ex.: '.search-input', 'input', 'input[name="search"]' 
	Defaul: #searchInput

- minChars - min cahrs count to start searching
	Values ex.: 1, 2, 3
	Defaul: 1

- minRows - min rows in talbe to search
	Values ex.: 1, 2, 3
	Defaul: 1

- emptyMsg - message that will be shown, when no rows will be found.
	Values ex.: 'Nothing found. Sorry...'
	Defaul: 'No data found'

- emptyTrId - id for no empty message tr tag.
	Values ex.: 'empty-row'
	Defaul: 'filterForTableEmptyRow'

- exceptClass - tr with choosen class will be excepted from filtering.
	Values ex.: 'red'
	
- data-filter - if added data-filter option with value for td tag plugin will filter useing this value