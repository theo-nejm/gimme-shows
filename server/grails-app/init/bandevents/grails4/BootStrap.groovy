package bandevents.grails4

class BootStrap {
    def init = { servletContext ->
        def user = User.findById(2)
        def role = Role.findById(2)

        User.withTransaction {
            new UserRole(user: user, role: role).save(flush:true)
        }

    }
    def destroy = {
    }
}
