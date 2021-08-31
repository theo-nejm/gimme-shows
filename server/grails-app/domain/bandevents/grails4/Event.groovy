package bandevents.grails4

import grails.rest.Resource

@Resource(uri = '/api/events')
class Event {
    String name
    Date date

    static hasMany = [bands: Band]

    static constraints = {
        name nullable: false, blank: false
        date nullable: false, blank: false
    }

    static mapping = {
    }
}