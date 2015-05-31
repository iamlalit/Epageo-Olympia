function toggleView(obj) // the li element clicked in the current scope
{
    var element = obj;  // This is the DOM object being clicked
    var $this = $(obj); // This is the jQuery object being clicked
    $this.closest('li').toggleClass('show')
    console.log()
    if($this.children('span').hasClass('olympia-caret-down')){
    	$this.children('span').removeClass('olympia-caret-down');
    	$this.children('span').addClass('olympia-caret-up');
    }else{
    	$this.children('span').addClass('olympia-caret-down');
    	$this.children('span').removeClass('olympia-caret-up');
    }
}