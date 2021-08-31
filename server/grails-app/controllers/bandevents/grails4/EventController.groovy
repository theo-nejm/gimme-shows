package bandevents.grails4

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.Transactional

@Secured(['permitAll'])
class EventController {
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        def events = Event.list()
        respond events, [status: OK, view:"show", model: [events: events]]
    }

    def show(Long id) {
        Event event = Event.get(id)
        respond event, [status: OK, view: "showOne", model: [event: event]]
    }

    @Transactional
    def save(Event event) {
        if (event == null) {
            render status: NOT_FOUND
            return
        }
        if (event.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond event.errors
            return
        }

        try {
            event.save flush: true
        } catch (ValidationException e) {
            respond event.errors
            return
        }

        def savedEvent = Event.findByName(event.name)
        respond event, [status: CREATED, view:"showOne", model: [event: savedEvent]]
    }

    @Transactional
    def update(Event event) {
        if (event == null) {
            render status: NOT_FOUND
            return
        }
        if (event.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond event.errors
            return
        }

        try {
            event.save flush: true
        } catch (ValidationException e) {
            respond event.errors
            return
        }

        respond event, [status: OK, view:"showOne", model: [event:event]]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || eventService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}