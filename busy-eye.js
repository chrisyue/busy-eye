(function() {
    var canvas = {};
    canvas.drawMosaic = function() {
        var mosaicWidth = 100;

        var doc = document;

        var bwidth = doc.documentElement.clientWidth;
        var bheight = doc.documentElement.clientHeight;

        var nbCols = Math.ceil(bwidth / mosaicWidth);
        var nbRows = Math.ceil(bheight / mosaicWidth);

        if (0 === nbCols % 2) {
            nbCols--;
        }

        nbCols += 2;

        var style = doc.createElement('style');
        doc.head.appendChild(style);
        var sheet = style.sheet;
        sheet.insertRule('* { color: red !important; background: transparent !important }', 0);
        sheet.insertRule('.busy-eye-mosaic-frame { position: fixed; z-index: -9999; top: 0; bottom: 0; left: 0; right: ' + (bwidth - nbCols * mosaicWidth) + 'px }', 0)
            sheet.insertRule('.busy-eye-mosaic-frame-translated { transform: translateX(' + (-mosaicWidth) + 'px) }', 0)
            sheet.insertRule('.busy-eye-mosaic { float: left; width: ' + mosaicWidth + 'px; height: ' + mosaicWidth + 'px }', 0);
        sheet.insertRule('.busy-eye-mosaic-light { background: #fff !important }', 0);
        sheet.insertRule('.busy-eye-mosaic-dark { background: #000 !important }', 0);

        var frame = doc.createElement('div');
        frame.className = 'busy-eye-mosaic-frame';

        doc.body.appendChild(frame);

        var nbMosaic = nbCols * nbRows;

        for (var i = 1; i <= nbMosaic; ++i) {
            var mosaic = doc.createElement('div');

            if (i % 2) { // odd
                mosaic.className = 'busy-eye-mosaic busy-eye-mosaic-dark';
            } else {
                mosaic.className = 'busy-eye-mosaic busy-eye-mosaic-light';
            }

            frame.appendChild(mosaic);
        }

        return frame;
    }

    var mosaic = canvas.drawMosaic();

    setInterval(function() {
        if (mosaic.className.indexOf('busy-eye-mosaic-frame-translated') >= 0) {
            mosaic.className = mosaic.className.replace(' busy-eye-mosaic-frame-translated', '');
        } else {
            mosaic.className += ' busy-eye-mosaic-frame-translated';
        }
    }, 100);
})();
