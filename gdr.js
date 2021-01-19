/**
 * JavaScript Library
 * Version: 6.0
 * Copyright: Global Development Room.
 * Author: Oleksandr Drozd
*/

(function(_d, _w, _n) {
    'use strict';
    var GDR = function(a, b, c) {
            [].push.apply(this, $.type(a, 'string') ? ((c = a.match(/^<(\w+)\/?>$/)) ? [_d.createElement(c[1])] : /(<([^>]+)>)/i.test(a) ? $.parseHTML(a) : _d.querySelectorAll(a)) : a.length >= 0 && a !== _w ? a : typeof a === 'object' ? [a] : []);
            if (c && $.type(b, 'object')) {
                for (let k in b) {
                    if ($.type(this[k], 'function')) this[k](b[k]);
                    else this.attr(k, b[k])
                }
            }
        },
        inCb = (a, b, c) => {
            var j = '';
            a.replace(/<script(.*?)>([\s\S]*?)<\/script>/gmi, function(a, b, c) {
                j += c
            });
            setTimeout(function() {
                if ($.type(c, 'function')) c.call(b, h);
                if (j) {
                    var s = _d.createElement('script');
                    s.text = j;
                    _d.head.appendChild(s).parentNode.removeChild(s)
                }
            }, 0)
        };
    _w.$ = (a, b) => {
        return $.type(a, 'object') && a.gdr ? a : /^f/.test(typeof a) ? (/c/.test(_d.readyState) ? a.call(_d, $) : _w.addEventListener('load', a, false)) : new GDR(a, b)
    };
    $.fn = GDR.prototype = {
        gdr: 'v 6.0',
        ready: function(a) {
            if (/^f/.test(typeof a)) {
                if (/c/.test(this.readyState)) a.call(this, $);
                else this.bind('DOMContentLoaded', a)
            }
            return this
        },
        visible: function(c) {
            var a, e, k = {
                hidden: 'visibilitychange',
                webkitHidden: 'webkitvisibilitychange',
                mozHidden: 'mozvisibilitychange',
                msHidden: 'msvisibilitychange'
            };
            for (a in k) {
                if (a in _d) {
                    e = k[a];
                    break
                }
            }
            if (c) this.bind(e, function() {
                c(/^v/.test(_d.visibilityState))
            });
            return !_d[a]
        },
        scroll: function(a, b) {
            return this.bind('scroll', a, b)
        },
        resize: function(a) {
            return this.bind('resize', a)
        },
        focus: function(a) {
            return a ? this.bind('focus', a) : this[0].focus()
        },
        blur: function(a) {
            return a ? this.bind('blur', a) : this.emit('blur')
        },
        emit: function(a, b) {
            return this.each(function() {
                this.dispatchEvent(new Event(a, (b || {
                    bubbles: true,
                    cancelable: true
                })))
            })
        },
        prop: function(a,b){
            return this.each(function() {
                this[a] = b;
            })
        },
        click: function(a) {
            return a ? this.bind('click', a) : this.each(function() {
                this.click()
            })
        },
        submit: function(a){
            return a ? this.bind('submit', a) : this.each(function() {
                this.submit()
            })
        },
        mousedown: function(a) {
            return a ? this.bind('mousedown', a) : this.each(function() {
                this.mousedown()
            })
        },
        change: function(cb) {
            return this.bind('change', cb)
        },
        bind: function(a, b, c) {
            if (!b) return this;
            var t = a.split(/\s+/);
            for (let i = 0; i < t.length; i++) {
                this.each(function(g, e) {
                    if (!e.events) e.events = {};
                    if (!e.events[t[i]]) e.events[t[i]] = [];
                    if (c) $(e).unbind(t[i]);
                    if (!b.name || !$.inArr(b, e.events[t[i]])) {
                        if (!e.events[t[i]]) e.events[t[i]] = [];
                        e.events[t[i]].push(b)
                    }
                    e.addEventListener(t[i], b, false)
                })
            }
            return this
        },
        unbind: function(act, b) {
            function remove(t, a, e) {
                if (!e) return this;
                for (let i = 0; i < e.length; i++) {
                    if (!b || (b && e[i] === b)) {
                        t.removeEventListener(a, e[i], false)
                    }
                }
                if (!b) delete t.events[a]
            }

            function each(a) {
                this.each(function() {
                    var e = this.events || {};
                    if (!a) {
                        for (let n in e) remove(this, n, e[n])
                    } else remove(this, a, e[a])
                })
            }
            if (arguments.length) {
                var t = act.split(/\s+/);
                for (let i = 0; i < t.length; i++) each.call(this, t[i])
            } else each.call(this);
            return this
        },
        attr: function(a, b) {
            if (typeof a === 'object') {
                for (let i in a) this.attr(i, a[i]);
                return this
            } else if (arguments.length > 1) {
                return this.each(function() {
                    this.setAttribute(a, b)
                })
            } else return this.length ? this[0].getAttribute(a) : this
        },
        removeAttr: function(a) {
            if (typeof a === 'object') {
                for (let i in a) this.removeAttr(i, a[i]);
                return this
            } else {
                return this.each(function() {
                    this.removeAttribute(a)
                })
            }
        },
        replaceAttr: function(a, b) {
            return this.each(function(i, e) {
                var v = e.getAttribute(a);
                if (v != null) e.setAttribute(b, v);
                e.removeAttribute(a)
            })
        },
        hasAttr: function(a) {
            return this[0].hasAttribute(a)
        },
        hide: function(a) {
            return this.each(function() {
                this.style.display = 'none'
            })
        },
        show: function(a) {
            return this.each(function() {
                this.style.display = 'block'
            })
        },
        css: function(a, b) {
            let x = (a) => $.type(a, 'number') ? a+'px' : a;
            if ($.type(a, 'object')) {
                for (let p in a) {
                    this.each(function() {
                        this.style[p] = x(a[p])
                    })
                }
                return this
            } else {
                return b === []._ ? this[0].style[a] || getComputedStyle(this[0])[a] : this.each(function() {
                    return this.style[a] = x(b)
                })
            }
        },
        fadeIn: function(a, b) {
            return this.each(function(i, e) {
                e.style.display = 'block';
                e.style.opacity = '0';
                setTimeout(function() {
                    $(e).animate({
                        opacity: '1'
                    }, a, function(e) {
                        if (b) b.call(e)
                    })
                }, 50)
            })
        },
        fadeOut: function(a, b) {
            return this.each(function() {
                this.style.opacity = '1';
                $(this).animate({
                    opacity: '0'
                }, a, function(e) {
                    if (b) b.call(e);
                    e.style.display = 'none'
                })
            })
        },
        animate: function(a, b = 200, c){
            return this.each(function(i, e){
                e.style.transition = b+'ms';
                $(e).css(a);
                setTimeout(() => {
                    e.style.transition = '';
                    if(c) c.call(e, b)
                }, b);
            })
        },
        addClass: function(a) {
            return this.each(function() {
                this.classList.add(a)
            })
        },
        removeClass: function(a, b) {
            return this.each(function() {
                this.classList.remove(a)
            })
        },
        replaceClass: function(a, b) {
            return this.each(function() {
                $(this).removeClass(a).addClass(b)
            })
        },
        toggleClass: function(a) {
            var t = a.split(/\s+/);
            for (let i = 0; i < t.length; i++) {
                this.each(function() {
                    this.classList.toggle(t[i]);
                })
            }
            return this
        },
        hasClass: function(a) {
            return this[0].classList.contains(a)
        },
        text: function(a) {
            var text = '';
            this.each(function(){
                if (a === []._) text += this.textContent;
                else this.textContent = a
            });
            return a ? this : text
        },
        val: function(a) {
            if (arguments.length) {
                return this.each(function() {
                    this.value = a
                })
            } else {
                return this.length ? (this[0].value || this.attr('value') || '') : this
            }
        },
        getVal: function(a, b) {
            if (!a || typeof a == 'function') {
                b = a;
                a = this
            }
            var r = '';
            for (let i = 0; a[i]; i++) {
                if (a[i].nodeType === 3 || a[i].nodeType === 4) r += a[i].nodeValue + "\n";
                else if (a[i].nodeType !== 8) {
                    var p = b ? b(a[i]) : false;
                    r += p ? p : $.fn.getVal(a[i].childNodes, b)
                }
            }
            return r
        },
        autosize: function() {
			let r = (e,h) => {
				e.style.height = '';
				e.style.height = e.scrollHeight + 'px'
			};
            return this.each(function() {
				this.style.overflow = 'hidden';
				r(this);
                $(this).bind('input', function(){
                    r(this);
                })
            })
        },
        empty: function() {
            return this.each(function() {
                while (this.firstChild) this.removeChild(this.firstChild)
            })
        },
        insertAdjacent: function(a, b) {
            return this.each(function(i, e) {
                if (b.nodeType || b.gdr) {
                    //e.insertAdjacentElement(a, $(b).clone(true)[0])
                    e.insertAdjacentElement(a, b[0])
                } else {
                    inCb(b, e);
                    e.insertAdjacentHTML(a, b)
                }
            })
        },
        append: function(a) {
            return this.insertAdjacent('beforeEnd', a)
        },
        prepend: function(a) {
            return this.insertAdjacent('afterBegin', a)
        },
        before: function(a) {
            return this.insertAdjacent('beforeBegin', a)
        },
        after: function(a) {
            return this.insertAdjacent('afterEnd', a)
        },
        html: function(a, b) {
            return a === []._ ? this[0].innerHTML : this.each(function(i, e) {
                if (typeof a == 'object') {
                    e.innerHTML = '';
                    e.appendChild(a.gdr ? a[0] : a)
                } else {
                    inCb(a, e);
                    e.innerHTML = a
                }
            })
        },
        data: function(a,b){
            return $.type(a,'object') ? this.each(function(){
                for(let k in a) this[k] = a[k];
            }) : b !== []._ ? this.each(function(){
                if(b != null) this.dataset[a] = b;
                else delete this.dataset[a];
            }) : (
                a ? (
                	this[0] ? this[0].dataset[a] : ''
                ) : []._
            );
        },
        position: function() {
            return this.length ? {
                top: this[0].offsetTop,
                left: this[0].offsetLeft
            } : ''
        },
        offset: function() {
            var e = _d.documentElement,
                b = this[0].getBoundingClientRect(),
                t = b.top + _w.pageYOffset - e.clientTop,
                l = b.left + _w.pageXOffset - e.clientLeft;
            return {
                top: t,
                left: l,
                width: b.width,
                height: b.height
            }
        },
        height: function(h) {
            var b = _d.body;
            return arguments.length ? this.css('height', h) : (this.length ? (this[0] === _w ? _w.innerHeight : (this[0] === _d ? Math.max(b.scrollHeight, _d.documentElement.scrollHeight, b.offsetHeight, _d.documentElement.offsetHeight, b.clientHeight, _d.documentElement.clientHeight) : this[0].offsetHeight)) : this)
        },
        width: function(w) {
            var b = _d.body;
            return arguments.length ? this.css('width', arguments[0]) : (this[0] === _w ? _w.innerWidth : (this[0] === _d ? Math.max(_d.documentElement.clientWidth, b.scrollWidth, _d.documentElement.scrollWidth, b.offsetWidth, _d.documentElement.offsetWidth) : (this.length ? this[0].offsetWidth : this)))
        },
        scrollTop: function(a, b, c) {
            return a == []._ && this.length ? (this[0].scrollTop || _w.pageYOffset) : this.each(function(i, e) {
                $.animate({
                    start: $(e).scrollTop(),
                    end: a,
                    duration: b || 0,
                    complete: c,
                    draw: function(t, v) {
                        if (e == _w || e == _d) _w.scrollTo(0, Math.round(v));
                        else e.scrollTop = Math.round(v)
                    }
                })
            })
        },
        scrollIntoView: function(p) {
            if (this.length) this[0].scrollIntoView(p);
            return this
        },
        scrollheight: function() {
            if (!this.length) return false;
            return this[0].scrollHeight
        },
        scrollWidth: function() {
            if (!this.length) return false;
            return this[0].scrollWidth
        },
        is: function(a) {
            if (this[0] === _d || a === _d || this[0] === _w || a === _w) return this[0] === a ? true : false;
            return (this[0].matches || this[0].matchesSelector || this[0].msMatchesSelector || this[0].mozMatchesSelector || this[0].webkitMatchesSelector || this[0].oMatchesSelector).call(this[0], a)
        },
        isVisible: function(){
            return (this.css('display') === 'none' || this.css('visibility') === 'hidden' || this.css('opacity') === '0') ? false : true
        },
        prev: function() {
            return $(this[0].previousElementSibling || this)
        },
        next: function() {
            return $(this[0].nextElementSibling || this)
        },
        first: function() {
            return this.length ? $(this[0]) : this
        },
        last: function() {
            return this.length ? $(this[this.length - 1]) : this
        },
        get: function(a) {
            return this[a] ? $(this[a]) : this
        },
        filter: function(s) {
            var arr = [];
            if (typeof s === 'string') {
                for (let i = 0; i < this.length; i++) {
                    if ($(this[i]).is(s)) arr.push(this[i])
                }
            } else if (typeof s === 'function') {
                for (let i = 0; i < this.length; i++) {
                    if (s.call(this, i, this[i]) === true) arr.push(this[i])
                }
            }
            return $(arr)
        },
        find: function(s) {
            var arr = [],
                q, then = this;
            this.each(function() {
                q = Array.prototype.slice.call(this.querySelectorAll(s), '');
                if (q.length) arr = arr.concat(q)
            });
            return $(arr)
        },
        parent: function(s) {
            if (s && this.length) {
                var a = this[0],
                    res;
                while (a) {
                    if ($(a).is(s) && a !== this[0]) return a;
                    a = a.parentNode
                }
            }
            return this.length > 0 ? $(this[0].parentNode) : $([])
        },
        parents: function(s) {
            var a = this[0],
                res = [];
            while (a) {
                if (a !== this[0]) {
                    if (s) {
                        if ($(a).is(s)) res.push(a)
                    } else res.push(a)
                }
                a = a.parentNode
            }
            return res.length ? $(res) : $([])
        },
        children: function(s) {
            var res = [];
            if (this.length) {
                if (!s) {
                    var e = this[0].firstChild,
                        el = [];
                    while (e) {
                        e = e.nextSibling;
                        if (e instanceof Element) el.push(e);
                    }
                    res = el
                } else {
                    res = this[0].querySelectorAll ? this[0].querySelectorAll(s) : []
                }
            }
            return $(res)
        },
        clone: function(a, b) {
            var res = [];
            this.each(function(i, e) {
                var c = this.cloneNode(true);
                if (a && e.events) {
                    for (let k in e.events) {
                        for (let i = 0; i < e.events[k].length; i++) {
                            c.addEventListener(k, e.events[k][i], false)
                        }
                    }
                }
                res.push(c)
            });
            return $(res)
        },
        remove: function() {
            return this.each(function() {
                if (this.parentNode) this.parentNode.removeChild(this)
            })
        },
        replaceWith: function(a, b) {
            return this.each(function() {
                pasteCb(this, a, b);
                this.outerHTML = a
            })
        },
        appendTo: function(s) {
            var e = this;
            $(s).each(function() {
                this.appendChild(e[0])
            });
            return e
        },
        prependTo: function(s) {
            var e = this;
            $(s).each(function() {
                this.insertBefore(e[0], this.firstChild)
            });
            return e
        },
        lazy: function(a, b) {
            var _t = this, w = b || _w;
            let check = () => {
                for (let i = 0; i < _t.length; i++) {
                    if (_t[i] && $(_t[i]).offset().top < ($(_w).height() + $(_w).scrollTop() + 350)) {
                        a.call(_t[i]);
                        _t.splice(i, 1);
                        i--
                    }
                }
                return _t.length
            };

            let init = () => check() < 1 ? $(w).unbind('scroll resize', init) : false;
            init();
            $(w).bind('scroll resize', init)
        },
        each: function(a, b) {
            for (let i = 0; i < this.length; i++) {
                if (a.call(this[i], i, this[i]) === false) break
            }
            return this
        },
        indexOf: function(a) {
            return [].indexOf.call(this, a)
        },
        draggable: function() {
            var a = this,
                w = $(_w);
            a.bind('mousedown', (e) => {
                if (e.pageX && e.pageY) {
                    let o = a.position(),
                        x = parseInt(o.left || 0) - e.pageX,
                        y = parseInt(o.top || 0) - e.pageY;
                    w.bind('mousemove', (e) => {
                        a.css({
                            left: x + e.pageX + 'px',
                            top: y + e.pageY + 'px',
                        })
                    })
                }
            });
            w.bind('mouseup', () => w.unbind("mousemove"));
            a.css({
                position: 'absolute',
                'z-index': 999999999,
                'user-select': 'none',
                cursor: 'move'
            });
            return this;
        },
        copyText: function(a){
            let t = this.text(),
                i = $('<textarea/>', {
                text: t
            });
            i.appendTo('body');
            i.select();
            _d.execCommand('copy');
            if(a) a.call(this, t);
            i.remove();
            return this;
        },
        select: function(){
            return this.each(function() {
                this.select();
            });
        },
        splice: function(a, b) {
            [].splice.call(this, a, b);
            return this
        },
        upload: function(a){
            return this.each(function() {
                let t = this;
                t.files = {};
                let i = $('<input/>', {
                    type: 'file',
                    hidden: true,
                    name: t.dataset.name || 'file',
                    multiple: t.hasAttribute('multiple')
                }).bind('change', function(e){
                    for(let k = 0; k < this.files.length; k++){
                        t.files[this.files[k].name] = this.files[k];
                        if(a) a.call(t, this.files[k], this);
                    }
                    this.value = '';
                })
                t.onclick = () => i.click();
            })
        },
        slideToggle: function(a,b){
            return this.each(function(i,e){
                let _ = $(e);
                _.isVisible() ? _.slideUp(a,b) : _.slideDown(a,b);
            });
        },
        slideUp: function(a = 200,b){
            return this.each(function(i,e){
                let _ = $(e).css('overflow','hidden');
                $.animate({
                    start: _.height(),
                    end: 0,
                    duration: a,
                    complete: () => {
                        _.hide().css({
                            overflow: '',
                            height: ''
                        });
                        if(b) b.call(e,a);
                    },
                    draw: function(t, v) {
                        _.height(Math.round(v));
                    }
                });
            });
        },
        slideDown: function(a = 200,b){
            return this.each(function(i,e){
                let _ = $(e);
                _.css({
                    overflow: 'hidden',
                    visibility: 'hidden',
                    display: 'block'
                });
                let h = _.height();
                _.css({
                    height: 0,
                    visibility: ''
                });
                $.animate({
                    start: 0,
                    end: h,
                    duration: a,
                    complete: () => {
                        _.css({
                            overflow: '',
                            height: ''
                        });
                        if(b) b.call(e,a);
                    },
                    draw: function(t, v) {
                        _.height(Math.round(v));
                    }
                });
            })
        }
    };
    $.each = (o, f) => {
        if ($.type(o, 'object')) {
            for (let i in o) {
                if (f.call(o[i], i, o[i]) === false) break
            }
        } else $.fn.each.call(o, f);
        return o
    };
    $.animate = function(a){
        var s = performance.now();
        let g = requestAnimationFrame(function animate(t){
            var f = (t-s)/a.duration;
            if(f > 1) f = 1;
            a.draw(f, a.start+(a.end-(a.start))*f);
            if(f < 1)
                requestAnimationFrame(animate);
            else if(a.complete)
                a.complete();
        });
    };
    $.ajax = (a,b,c,d) => {
        return fetch(a,Object.assign({
            headers: {'X-Requested-With': 'Fetch'},
            mode: "same-origin",
            credentials: "same-origin"
        },b)).then(function(r) {
            return r[d || 'text']();
        }).then(function(r) {
            c(r);
        });
    };
    $.post = (a,b,c,d) => {
        let f = new FormData();
        for(let k in b) f.append(k, b[k]);
        return $.ajax(a, {
            method: 'POST',
            body: f,
        },c,d);
    };
    $.get = (a,b) => $.ajax(a,null,b);
    $.getJSON = (a,b) => $.ajax(a,null,b, 'json');
    $.isEmptyObject = (a) => !Object.keys(a).length;
    $.type = (a, b) => {
        let t = Object.prototype.toString.call(a).toLowerCase();
        return b ? (t === '[object ' + b + ']') : t
    };
    $.parseHTML = (a) => {
        let r = _d.createRange();
        r.selectNode(_d.body);
        return [r.createContextualFragment(a).firstChild]
    };

    $.extend = function(){
        var a = arguments, l = a.length, b = a[0] || {};
        for(let i = 1; i < l; i++){
            var o = a[i];
            if(!o) continue;
            for(let k in o){
                if(o.hasOwnProperty(k)){
                    if(typeof o[k] === 'object') $.extend(b[k], o[k]);
                    else b[k] = o[k];
                }
            }
        }
        return b;
    };

    $.inArr = (a, b) => b.indexOf(a) >= 0;
    $.cookie = (a,b,c) => {
        if(b === []._){
            let s = `; ${_d.cookie}`.match(`;\\s*${a}=([^;]+)`);
            return s ? s[1] : '';
        } else {
            let d = b === null ? new Date(0) : new Date(new Date().getTime()+(
                c || 2592000
            )*1000);
            _d.cookie = (
                a || ''
            )+'='+(
                b || ''
            )+'; path=/; expires='+d.toUTCString();
        }
    };
})(document, window, navigator);
