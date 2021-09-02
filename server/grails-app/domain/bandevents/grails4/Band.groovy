package bandevents.grails4

import grails.rest.Resource

class Band {
    String name

    static hasMany = [events: Event]
    static belongsTo = [Event]

    static constraints = {
        name nullable: false, blank: false, unique: true
    }

    static mapping = {
    }
}
