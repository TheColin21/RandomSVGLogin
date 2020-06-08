(function() {
    function initialize() {
        this._timer = [];
        this.saveUrl = $('#unsplash-settings').data().save;

		$('#unsplash-style-tinting').on(
			'change',
			(e) => {
				let $target = $(e.target)
                if($target[0].checked){
					$('#unsplash-style-color-strenght').prop('disabled', false);
                }else{
					$('#unsplash-style-color-strenght').prop('disabled', true);
				}
			}
		);


        $('[data-setting]').on(
            'change',
            (e) => {
                let $target = $(e.target),
                    key     = $target.data('setting'),
                    value   = $target.val();

                if($target.attr('type') === 'checkbox') {
                    value = $target[0].checked ? 'true':'false';
                }

				if($target.attr('type') === 'select') {
					value = $target.val();
				}

                _setValue(key, value);
            }
        );
    }

    /**
     * Update configuration value
     *
     * @param key
     * @param value
     * @private
     */
    function _setValue(key, value) {
        $.post(this.saveUrl, {key, value})
         .success(() => {_showMessage('success');})
         .fail(() => {_showMessage('error');});
    }

    /**
     * Show save success/fail message
     *
     * @param type
     * @private
     */
    function _showMessage(type) {
        let $el = $('#unsplash-settings').find(`.msg.${type}`);
        $el.removeClass('active').addClass('active');

        clearTimeout(this._timer[type]);
        this._timer[type] = setTimeout(() => { $el.removeClass('active'); }, 1000);
    }

    initialize();
})();