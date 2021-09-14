package bandevents.grails4

import grails.rest.Resource

class Event {
    String name
    Date date

    String country
    String state
    String city

    static hasMany = [bands: Band]

    static constraints = {
        name nullable: false, blank: false
        date nullable: false, blank: false
    }

    static mapping = {
    }
}