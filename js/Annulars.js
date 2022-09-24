/**
 *    A leaflet plugin inspired by https://github.com/Falke-Design/L.Donut (Flake Design) and 
 *    https://github.com/jieter/Leaflet-semicircle  Jieter, consolidated by FRANKS ADWAR, for creating Annular sectors 
 *    using Leaflet
 *      
 *    The code has been modified to work with only SVG, Canvas support will be added later NB: Leaflet supports SVG by default
 *     
 *    Parameters to use are sradius, innerRadius, startAngle and stopAngle
 * 
 *      
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined' && typeof require !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw 'Leaflet must be loaded first';
        }
        factory(window.L);
    }
})(function(L){

    var DEG_TO_RAD = Math.PI / 180;

    // make sure 0 degrees is up (North) and convert to radians.
    function fixAngle (angle) {
        return (angle - 90) * DEG_TO_RAD;
    }

    // rotate point [x + r, y+r] around [x, y] by `angle` radians.
    function rotated (p, angle, r) {
        return p.add(
            L.point(Math.cos(angle), Math.sin(angle)).multiplyBy(r)
        );
    }

    L.Point.prototype.rotated = function (angle, r) {
        return rotated(this, angle, r);
    };

    function polarToCartesian(centerX, centerY, radius, angleInDegrees){
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    
    var annular = {
        options: {
            startAngle: 0,
            stopAngle: 359.99999
        },

        initialize: function(latlng, options, legacyOpations){
            L.Circle.prototype.initialize.call(this, latlng, options, legacyOpations)
            if(isNaN(this.options.innerRadius)){
                throw new Error('Inner radius cannot be NaN');
            }

            if(this.options.innerRadius >= this.options.radius){
                throw new Error('Outer radius must be greater than the inner radius');
            }

            this._mInnerRadius = this.options.innerRadius;  
        },

        startAngle: function () {
            if (this.options.startAngle < this.options.stopAngle) {
                return fixAngle(this.options.startAngle);
            } else {
                return fixAngle(this.options.stopAngle);
            }
        },

        stopAngle: function () {
            if (this.options.startAngle < this.options.stopAngle) {
                return fixAngle(this.options.stopAngle);
            } else {
                return fixAngle(this.options.startAngle);
            }
        },

        setStartAngle: function (angle) {
            this.options.startAngle = angle;
            return this.redraw();
        },

        setStopAngle: function (angle) {
            this.options.stopAngle = angle;
            return this.redraw();
        },

        setDirection: function (direction, degrees) {
            if (degrees === undefined) {
                degrees = 10;
            }
            this.options.startAngle = direction - (degrees / 2);
            this.options.stopAngle = direction + (degrees / 2);

            return this.redraw();
        },


        getDirection: function () {
            return this.stopAngle() - (this.stopAngle() - this.startAngle()) / 2;
        },

        _project: function () {

            var map = this._map,
                crs = map.options.crs;
    
            if (crs.distance === L.CRS.Earth.distance) {
    
                var outer = this._radiusCalculation(this._mRadius);
                this._point = outer.point;
                this._radius = outer.radius;
                this._radiusY = outer.radiusY;
    
                var innerRadius = 0;
                if (this.options.innerRadiusAsPercent) {
                    var factor = this._mInnerRadius > 1 ? 1 : this._mInnerRadius;
                    innerRadius = this._mRadius * factor;
                } 
                else {
                    innerRadius = this._mInnerRadius;
                }
    
                var inner = this._radiusCalculation(innerRadius);
                this._innerPoint = inner.point;
                this._innerRadius = inner.radius;
                this._innerRadiusY = inner.radiusY;
    
            } else {
                var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
    
                this._point = map.latLngToLayerPoint(this._latlng);
                this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
            }
    
            this._updateBounds();
        },
    
        _radiusCalculation: function (radius) {
            var lng = this._latlng.lng,
                lat = this._latlng.lat,
                map = this._map;
    
            var d = Math.PI / 180,
                latR = (radius / L.CRS.Earth.R) / d,
                top = map.project([lat + latR, lng]),
                bottom = map.project([lat - latR, lng]),
                p = top.add(bottom).divideBy(2),
                lat2 = map.unproject(p).lat,
                lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
                    (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
    
            if (isNaN(lngR) || lngR === 0) {
                lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
            }
    
            return {
                point: p.subtract(map.getPixelOrigin()),
                radius: isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x,
                radiusY: p.y - top.y
            };
        },
    };

    L.Annular = L.Circle.extend(annular);

    L.annular = function(latlng, options){
        return new L.Annular(latlng, options);
    };

    L.SVG.include({
        _updateCircle : function(layer){
            if (layer._empty()) {
                return this._setPath(layer, 'M 0 0');
            }

            var p = layer._map.latLngToLayerPoint(layer._latlng),
                r = layer._radius,
                r2 = Math.round(layer._radiusY || r),

                start = p.rotated(layer.startAngle(), r), // replace this with my lines
                end = p.rotated(layer.stopAngle(), r);    // replace this with my lines

            var innerP = layer._innerPoint,
                innerR = Math.max(Math.round(layer._innerRadius),1),
                innerR2 = Math.max(Math.round(layer._innerRadiusY),1) || innerR; 

            var largeArc = (layer.options.stopAngle - layer.options.startAngle >= 180) ? '1' : '0';
            
            var outerStart = polarToCartesian(p.x, p.y,r,layer.options.stopAngle);
            var outerEnd = polarToCartesian(p.x, p.y, r, layer.options.startAngle);
            
            var innerStart = polarToCartesian(innerP.x, innerP.y, innerR, layer.options.stopAngle);
            var innerEnd = polarToCartesian(innerP.x, innerP.y, innerR, layer.options.startAngle);
            
            var d = [
                    "M", outerStart.x, outerStart.y,
                    "A", r, r2, 0, largeArc, 0, outerEnd.x, outerEnd.y,  
                    
                    "L", innerEnd.x, innerEnd.y,   
                    "A", innerR, innerR2, 0 ,largeArc, 1 , innerStart.x, innerStart.y,
                    "L", outerStart.x, outerStart.y, "z"
                    ].join(" ");

            this._setPath(layer, d);
        }
    });

    L.Canvas.include({
        _updateCircle : function(layer){
            if (!this._drawing || layer._empty()) {return; }

            var p = layer._point,
                ctx = this._ctx,
                r = layer._radius,
                s = (layer._radiusY || r) / r;

            if (s !==1){
                ctx.save();
                ctx.scale(1, s);
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);

            this._fillStroke(ctx, layer);
        }
    });
});

