$('head').prepend('<script defer src="https://use.fontawesome.com/releases/v5.6.3/js/all.js"></script>');
var originalWasu = '<div id="wasu-msg" class="dislogMsg"><div id="wasu-msg-contain"><div class="closeMsg" style="width: 100%; height: 100%;"></div><div id="wasu-msg-content"><div class="w-title"><span id="wasu-msg-title">This is the Title!</span><button class="closeMsg" id="btn-closeMsg">X</button></div><div class="w-container"><div id="wasu-msg-icon"></div><div id="wasu-msg-message">Post Message will be here!</div></div><div class="w-buttonArea"><button id="btn-msg-close">ปิด</button><button id="btn-msg-cancel">ยกเลิก</button><button id="btn-msg-okay">ตกลง</button><button id="btn-msg-no">ไม่ใช่</button><button id="btn-msg-yes">ใช่</button><button id="btn-msg-tryAgain">ลองใหม่</button></div></div></div></div>',
    $waMsg = $(originalWasu);
function wasuInit(option) {
    if(option.bgStyle) {
        $waMsg.css(option.bgStyle);
    }
    if(option.animation) {
        $('#wasu-msg-contain', $waMsg).css('animation', 'wasu-' + option.animation + ' ' + option.animationDuration + ' forwards');
    }
    
    originalWasu = $waMsg[0].outerHTML;

    var wasuFunction = {};

    wasuFunction.waHideMsgBtn = function() {
        $('#btn-msg-tryAgain', $waMsg).hide();
        $('#btn-msg-cancel', $waMsg).hide();
        $('#btn-msg-close', $waMsg).hide();
        $('#btn-msg-yes', $waMsg).hide();
        $('#btn-msg-no', $waMsg).hide();
        $('#btn-msg-okay', $waMsg).hide();
    }

    wasuFunction.openMsg = function(message, title, icon, button, animation, optionStyle) {
        //$('#wasu-msg').hide();
        //$('#wasu-msg-contain').hide();
        switch(icon) {
            case "question" :
                icon = '<i class="fas fa-question-circle"></i>';
                break;

            case "success" :
                icon = '<i style="color: green;" class="fas fa-check-circle"></i>';
                break;
                
            case "error" :
                icon = '<i style="color: red;" class="fas fa-times-circle"></i>';
                break;

            case "warning" :
                icon = '<i style="color: #ff9900;" class="fas fa-exclamation-triangle"></i>';
                break;

            case "info" :
                icon = '<i class="fas fa-info-circle"></i>';
                break;

            case "link" :
                icon = '<i class="fas fa-external-link-alt"></i>';
                break;

            default: break;
        }
        $('#wasu-msg-message', $waMsg).text(message);
        if(title) $('#wasu-msg-title', $waMsg).html(title);
        if(icon) $('#wasu-msg-icon', $waMsg).html(icon);
        if(animation && animation != "default"){
            if(animation.animation) {
                if(!animation.duration) animation.duration = '.5s';
                $('#wasu-msg-contain', $waMsg).css('animation', 'wasu-' + animation.animation + ' ' + animation.duration + ' forwards');
            } else {
                $('#wasu-msg-contain', $waMsg).css('animation', 'wasu-' + animation + ' .5s forwards');
            }
        }
        //wasuFunction.waHideMsgBtn();

        
        var msgOriginal = $($waMsg[0].outerHTML);
        if(optionStyle) msgOriginal.css(optionStyle);
        $('body').append(msgOriginal[0].outerHTML);
        var targetMsg = $($('.dislogMsg')[$('.dislogMsg').length - 1]);
        
        $('#wasu-msg-content .w-buttonArea button', targetMsg).each(function( index ) {
            $(this).remove();
        });
        var allButton = $($('#wasu-msg-content .w-buttonArea', $waMsg)[0].outerHTML);
        if(button) {
            if(button.addButton) {
                $.each(button.addButton, function( index, value ) {
                    allButton.prepend('<button id="btn-msg-' + value.namespace + '">' + value.text + '</button>') 
                });
            }
            $.each(button.option, function( index, value ) {
                //$('#btn-msg-' + value, allButton).css('display', 'unset');
                $('#wasu-msg-content .w-buttonArea', targetMsg).append($('#btn-msg-' + value, allButton)[0].outerHTML);
                //console.log($('#btn-msg-' + value, allButton));
            });
            
        } else {
            //$('#btn-msg-close', $waMsg).css('display', 'unset');
            $('#wasu-msg-content .w-buttonArea', targetMsg).append($('#btn-msg-close', allButton)[0].outerHTML);
        }
        //$('#wasu-msg').show();
        $('#wasu-msg-contain', $waMsg).show();

        if(button) {
            if(button.fn) {
                $.each(button.fn, function( index, value ) {
                    $('#btn-msg-' + index, targetMsg).click(function() { button.fn[index](); });
                });
                /*if(button.fn.tryAgain) $('#btn-msg-tryAgain', targetMsg).click(function() { button.fn.tryAgain(); });
                if(button.fn.cancel) $('#btn-msg-cancel', targetMsg).click(function() { button.fn.cancel(); });
                if(button.fn.close) $('#btn-msg-close', targetMsg).click(function() { button.fn.close(); });
                if(button.fn.yes) $('#btn-msg-yes', targetMsg).click(function() { button.fn.yes(); });
                if(button.fn.no) $('#btn-msg-no', targetMsg).click(function() { button.fn.no(); });
                if(button.fn.okay) $('#btn-msg-okay', targetMsg).click(function() { button.fn.okay(); });*/
            }
        }
        targetMsg.show();
        //$('.buttonArea button', $('.dislogMsg')[$('.dislogMsg').length - 1]).click(function() { wasuFunction.closeMsg(); });
        $('#wasu-msg-content .w-buttonArea button', targetMsg).click(function(e) {
            //console.log(targetMsg);
            //$(this).offsetParent().remove(); 
            wasuFunction.closeMsg(targetMsg);
        });
        $('.closeMsg', targetMsg).click(function(e) {
            //console.log(targetMsg);
            //$(this).offsetParent().remove(); 
            wasuFunction.closeMsg(targetMsg);
        });
        var output = {};
        output.dialog = function() {
            $('.closeMsg', targetMsg).each(function( index ) {
                $(this).remove();
            });
        };
        output.afterClose = function(fn) {
            $('.closeMsg', targetMsg).click(function(e) {
                fn();
                wasuFunction.closeMsg(targetMsg);
            });
        };
        $waMsg = $(originalWasu);
        return output;
    }

    wasuFunction.closeMsg = function(element, animation) {
        $(element).fadeOut('250');
        if(animation) {
            $('#wasu-msg-contain', element).css('animation', 'wasu-' + animation + '.25s forwards');
        } else {
            $('#wasu-msg-contain', element).css('animation', 'wasu-zoomOut .25s forwards');
        }
        setTimeout(function() {
            $('#wasu-msg-contain', element).hide();
            $('#wasu-msg-contain', element).css('animation', '');
            $('#wasu-msg-message', element).html('');
            $('#wasu-msg-title', element).html('');
            $('#wasu-msg-icon', element).html('');
            //wasuFunction.waHideMsgBtn();
            element.remove();
        }, 250);
    }

    return wasuFunction;
}