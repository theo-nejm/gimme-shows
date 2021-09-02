package bandevents.grails4

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.BAD_REQUEST
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

@Secured(['ROLE_ADMIN'])
class UserController {
	static responseFormats = ['json', 'xml']

    def index() {
        def users = User.list()
        respond users, [status: OK, view:"show", model: [users: users]]
    }

    def show(Long id) {
        User user = User.get(id)
        respond user, [status: OK, view: "showOne", model: [user: user]]
    }

    @Transactional
    def save(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        user.save(flush: true)
        def savedUser = User.findByUsername(user.username)

        user.rolesIds.each { Integer roleId ->
            UserRole.create(savedUser, Role.findById(roleId), true)
        }

        respond user, [status: CREATED, view:"showOne", model: [user: savedUser]]
    }

    @Transactional
    def update(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        user.save flush: true
        UserRole.removeAll(user);

        user.rolesIds.each { Integer roleId ->
            UserRole.create(user, Role.findById(roleId), true)
        }

        respond user, [status: OK, view:"showOne", model: [user: user]]
    }

    @Transactional
    def delete(Long id) {
        def user = User.findById(id)

        if(user) {
            UserRole.removeAll(user)
            user.delete()
        } else {
            render status: BAD_REQUEST
        }
        render status: NO_CONTENT
    }
}
