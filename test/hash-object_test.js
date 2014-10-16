/* jshint expr: true */
/*global describe,it*/
'use strict';

var expect = require('chai').expect,
    hashObject = require('../lib/hash-object.js');

describe('HashObject', function () {

    it('should not hash null objects', function () {
        var hash = hashObject(null);
        expect(hash).to.not.be.ok;
    });
    
    it('should hash simple objects', function () {
        var hash = hashObject({
            b: 'a',
            a: 'b'
        });
        expect(hash).to.be.ok;
    });

    it('should hash complex objects', function () {
        var hash = hashObject({
            test: 'hash',
            b: 'a',
            a: {
                c: 'd'
            },
            deep: {
                deep: {
                    deep: {
                        deep: 'here'
                    }
                },
                complex: {
                    test: 'here'
                }
            }
        });
        expect(hash).to.be.ok;
    });

    it('should hash objects with arrays', function () {
        var hash = hashObject({
            b: 'a',
            a: ['b', 'c', 'd', 'e'],
            c: 'd'
        });
        expect(hash).to.be.ok;
    });

    it('should equally hash identical simple objects', function () {
        var obj = {
            a: 'b',
            c: 'd',
            e: 'f'
        };

        var hash1 = hashObject(obj);
        var hash2 = hashObject(obj);

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical (but unordered) simple objects', function () {
        var hash1 = hashObject({
            a: 'b',
            c: 'd',
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical complex objects', function () {
        var obj = {
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: {
                        h: 'i'
                    }
                }
            },
            e: 'f'
        };

        var hash1 = hashObject(obj);
        var hash2 = hashObject(obj);

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical (but unordered) complex objects', function () {
        var hash1 = hashObject({
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: {
                        h: 'i'
                    },
                    h: {
                        i: 'j'
                    }
                }
            },
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    h: {
                        i: 'j'
                    },
                    g: {
                        h: 'i'
                    }
                }
            },
            b: {
                c: 'd'
            },
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical complex objects with arrays', function () {
        var obj = {
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ]
            },
            e: 'f'
        };

        var hash1 = hashObject(obj);
        var hash2 = hashObject(obj);

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical (but unordered) complex objects with arrays', function () {
        var hash1 = hashObject({
            a: 'b',
            b: ['c', 'd'],
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ]
            },
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            d: {
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ],
                e: {
                    f: 'g'
                }
            },
            b: ['c', 'd'],
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.equal(hash2);
    });

    it('should not equally hash different simple objects', function () {
        var hash1 = hashObject({
            a: 'b',
            c: 'd',
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            c: 'd'
        });

        expect(hash1).to.not.equal(hash2);
    });

    it('should not equally hash different complex objects', function () {
        var hash1 = hashObject({
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: {
                        h: 'i'
                    },
                    h: {
                        i: 'j'
                    }
                }
            },
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: 'h',
                    h: 'i'
                }
            },
            e: 'f'
        });

        expect(hash1).to.not.equal(hash2);
    });

    it('should not equally hash different complex objects (with arrays_', function () {
        var hash1 = hashObject({
            a: 'b',
            d: {
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ],
                e: {
                    f: 'g'
                }
            },
            b: ['c', 'd'],
            e: 'f',
            c: 'd'
        });
        var hash2 = hashObject({
            a: 'b',
            d: {
                f: [
                    {
                        g: 'h'
                    }
                ],
                e: {
                    f: 'g'
                }
            },
            b: ['c', 'd'],
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.not.equal(hash2);
    });

});/* jshint expr: true */
/*global describe,it*/
'use strict';

var expect = require('chai').expect,
    hashObject = require('../lib/hash-object.js');

describe('HashObject', function () {

    it('should hash simple objects', function () {
        var hash = hashObject({
            b: 'a',
            a: 'b'
        });
        expect(hash).to.be.ok;
    });

    it('should hash complex objects', function () {
        var hash = hashObject({
            test: 'hash',
            b: 'a',
            a: {
                c: 'd'
            },
            deep: {
                deep: {
                    deep: {
                        deep: 'here'
                    }
                },
                complex: {
                    test: 'here'
                }
            }
        });
        expect(hash).to.be.ok;
    });

    it('should hash objects with arrays', function () {
        var hash = hashObject({
            b: 'a',
            a: ['b', 'c', 'd', 'e'],
            c: 'd'
        });
        expect(hash).to.be.ok;
    });

    it('should equally hash identical simple objects', function () {
        var obj = {
            a: 'b',
            c: 'd',
            e: 'f'
        };

        var hash1 = hashObject(obj);
        var hash2 = hashObject(obj);

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical (but unordered) simple objects', function () {
        var hash1 = hashObject({
            a: 'b',
            c: 'd',
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical complex objects', function () {
        var obj = {
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: {
                        h: 'i'
                    }
                }
            },
            e: 'f'
        };

        var hash1 = hashObject(obj);
        var hash2 = hashObject(obj);

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical (but unordered) complex objects', function () {
        var hash1 = hashObject({
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: {
                        h: 'i'
                    },
                    h: {
                        i: 'j'
                    }
                }
            },
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    h: {
                        i: 'j'
                    },
                    g: {
                        h: 'i'
                    }
                }
            },
            b: {
                c: 'd'
            },
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical complex objects with arrays', function () {
        var obj = {
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ]
            },
            e: 'f'
        };

        var hash1 = hashObject(obj);
        var hash2 = hashObject(obj);

        expect(hash1).to.equal(hash2);
    });

    it('should equally hash identical (but unordered) complex objects with arrays', function () {
        var hash1 = hashObject({
            a: 'b',
            b: ['c', 'd'],
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ]
            },
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            d: {
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ],
                e: {
                    f: 'g'
                }
            },
            b: ['c', 'd'],
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.equal(hash2);
    });

    it('should not equally hash different simple objects', function () {
        var hash1 = hashObject({
            a: 'b',
            c: 'd',
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            c: 'd'
        });

        expect(hash1).to.not.equal(hash2);
    });

    it('should not equally hash different complex objects', function () {
        var hash1 = hashObject({
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: {
                        h: 'i'
                    },
                    h: {
                        i: 'j'
                    }
                }
            },
            e: 'f'
        });
        var hash2 = hashObject({
            a: 'b',
            b: {
                c: 'd'
            },
            c: 'd',
            d: {
                e: {
                    f: 'g'
                },
                f: {
                    g: 'h',
                    h: 'i'
                }
            },
            e: 'f'
        });

        expect(hash1).to.not.equal(hash2);
    });

    it('should not equally hash different complex objects (with arrays_', function () {
        var hash1 = hashObject({
            a: 'b',
            d: {
                f: [
                    {
                        g: 'h'
                    },
                    {
                        g: {
                            h: 'i'
                        }
                    }
                ],
                e: {
                    f: 'g'
                }
            },
            b: ['c', 'd'],
            e: 'f',
            c: 'd'
        });
        var hash2 = hashObject({
            a: 'b',
            d: {
                f: [
                    {
                        g: 'h'
                    }
                ],
                e: {
                    f: 'g'
                }
            },
            b: ['c', 'd'],
            e: 'f',
            c: 'd'
        });

        expect(hash1).to.not.equal(hash2);
    });

});