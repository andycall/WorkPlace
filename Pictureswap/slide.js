$('#demo1').sharrre({
    share: {
        googlePlus: true,
        facebook: true,
        twitter: true
    },
    buttons: {
        googlePlus: {size: 'tall', annotation:'bubble'},
        facebook: {layout: 'box_count'},
        twitter: {count: 'vertical', via: '_JulienH'}
    },
    hover: function(api, options){
        $(api.element).find('.buttons').show();
    },
    hide: function(api, options){
        $(api.element).find('.buttons').hide();
    },
    enableTracking: true
});/**
 * Created with JetBrains WebStorm.
 * User: andycall
 * Date: 8/21/13
 * Time: 12:25 AM
 * To change this template use File | Settings | File Templates.
 */
