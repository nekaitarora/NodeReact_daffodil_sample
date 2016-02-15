/**
 * Created on 26-11-15.
 */

var ApiCallImplementation = require('./ApiCallImplementation');

function CassandraGetGamesByFlagId( options, callback) {
    ApiCallImplementation.apply(this, arguments);

    var err = null;

    if (!options) {
        err = "No options defined";
        if (callback && callback instanceof Function) {
            callback(err);
            return;
        }
        return this;
    }

    if (!options.connection) {
        err = "No connection defined";
        if (callback && callback instanceof Function) {
            callback(err);
            return;
        }
        return this;
    }

    this.connection = options.connection;

    if (!options.data || !callback || !(callback instanceof Function)) {
        if (callback && callback instanceof Function) {
            callback(err, this);
            return;
        }
        return this;
    }

    // If we have data and a callback we immediately execute
    // We are aware that this is normally not done in a constructor,
    // but it is a shorthand.
    this.execute(options.data, callback);

    return this;
}

CassandraGetGamesByFlagId.prototype.execute = function(data, callback){

    var err = null;

    if (!data) {
        err = "No data defined";
        if (callback && callback instanceof Function) {
            callback(err);
            return;
        }
        return false;
    }
    if (!data._flag_id) {
        err = "No _flag_id in data defined";
        if (callback && callback instanceof Function) {
            callback(err);
            return;
        }
        return false;
    }
    if (!this.connection) {
        err = "No connection given";
        if (callback && callback instanceof Function) {
            callback(err);
            return;
        }
        return false;
    }

    if (!callback || !callback instanceof Function) {
        return false;
    }

    console.log('CassandraGetGamesByFlagId execute called');

    var selectCql = 'SELECT * FROM game WHERE flag_ids CONTAINS ?';
    var params = [data['_flag_id']];

    this.connection.execute(selectCql, params, {prepare: true}, function(err, result) {
        if(err) {
            callback(err);
            return
        }
        // remap the stripped underscores
        if (result.rows) {
            result.rows.forEach(function(row,index){
                row._id = row.id.toString();
                delete row.id;
                row._rev = row.rev;
                delete row.rev;
                row._category_id = row.category_id;
                delete row.category_id;
                row._platform_ids = row.platform_ids;
                delete row.platform_ids;
                row._flag_ids = row.flag_ids;
                delete row.flag_ids;
                row._restricted_country_ids = row.restricted_country_ids;
                delete row.restricted_country_ids;
            });
        }
        callback(null, result.rows);
    });
};

/*!
 * Inherit from abstract Implementation.
 */

CassandraGetGamesByFlagId.prototype.__proto__ = ApiCallImplementation.prototype;


module.exports = CassandraGetGamesByFlagId;
