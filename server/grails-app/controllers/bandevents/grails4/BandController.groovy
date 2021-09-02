package bandevents.grails4

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

import grails.validation.ValidationException
import grails.gorm.transactions.Transactional

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class BandController {
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]


    def index() {
        List<Band> bands = Band.list()
        respond bands, [view: 'show', status: OK, model: [bands: bands]]
    }

    def show(Long id) {
        Band band = Band.findById(id)
        respond band, [view: 'showOne', status: OK, model: [band: band]]
    }

    @Transactional
    def save(Band band) {
        if (band == null) {
            render status: NOT_FOUND
            return
        }
        if (band.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond band.errors
            return
        }
        try {
            band.save flush:true
        } catch (ValidationException e) {
            respond band.errors
            return
        }

        Band savedBand = Band.findByName(band.name)
        respond savedBand, [status: CREATED, view:"showOne", model: [band: savedBand]]
    }

    @Transactional
    def update(Band band) {
        if (band == null) {
            render status: NOT_FOUND
            return
        }
        if (band.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond band.errors
            return
        }

        try {
            band.save flush:true
        } catch (ValidationException e) {
            respond band.errors
            return
        }

        respond band, [status: OK, view:"showOne", model: [band: band]]
    }

    @Transactional
    def delete(Long id) {
        def band = Band.get(id)

        band.getEvents().each { event -> band.removeFromEvents(event) }

        band.delete()

        respond band, [status: NO_CONTENT]
    }
}