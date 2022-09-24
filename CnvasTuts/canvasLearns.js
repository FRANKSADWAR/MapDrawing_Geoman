 function _updateCircle (layer) {
    var p = layer._point,
        r = Math.max(Math.round(layer._radius), 1),
        r2 = Math.max(Math.round(layer._radiusY), 1) || r,
        arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

    // drawing a circle with two half-arcs
    var d = layer._empty() ? 'M 0 0' :
        'M' + (p.x - r) + ',' + p.y +
        arc + (r * 2) + ',0 ' +
        arc + (-r * 2) + ',0 ';

    this._setPath(layer, d);
}


function createHalfs (layer) {
    // If we want a circle, we use the original function
    if (!(layer instanceof L.SemiCircle || layer instanceof L.SemiCircleMarker) ||
        !layer.isSemicircle()) {
        return _updateCircleSVG.call(this, layer);
    }
    if (layer._empty()) {
        return this._setPath(layer, 'M 0 0');
    }

    var p = layer._map.latLngToLayerPoint(layer._latlng),
        r = layer._radius,
        r2 = Math.round(layer._radiusY || r),
        start = p.rotated(layer.startAngle(), r),
        end = p.rotated(layer.stopAngle(), r);

    var largeArc = (layer.options.stopAngle - layer.options.startAngle >= 180) ? '1' : '0';

    var d = 'M' + p.x + ',' + p.y +
        // line to first start point
        'L' + start.x + ',' + start.y +
        'A ' + r + ',' + r2 + ',0,' + largeArc + ',1,' + end.x + ',' + end.y +
        ' z';

    this._setPath(layer, d);
}