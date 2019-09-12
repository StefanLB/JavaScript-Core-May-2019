const petController = (function () {

    const getCreate = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('.././views/pet/create-pet.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreate = function (ctx) {
        const { name, description, imageURL, category } = ctx.params;

        if (!name) {
            notifier.showError('Name is mandaroty.');
        } else if (!description) {
            notifier.showError('Description is mandaroty.');
        } else if (!imageURL.startsWith('http://') && !imageURL.startsWith('https://')) {
            notifier.showError('The image should start with "http://" or "https://".');
        } else if (!category) {
            notifier.showError('Category is mandaroty');
        } else {
            const pet = { name, description, imageURL, category, likes: 0 };
            
            petService.createPet(pet)
                .then(function (res) {
                    notifier.showSuccess('Pet created!');
                    ctx.redirect('#/pet/all');
                })
                .catch((function (err) {
                    notifier.handleError(err);
                }));
        }
    };

    const getAllPets = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const category = ctx.params.category;
        
        petService.getAllPets(category)
            .then(function (pets) {
                const userId = userService.findUserId();

                pets = pets.filter((pet) => {
                    return pet._acl.creator !== userId;
                });

                ctx.pets = pets.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/pet/all-pets.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getMyPets = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const userId = userService.findUserId();

        petService.getMyPets(userId)
            .then(function (pets) {
                ctx.pets = pets.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/pet/my-pets.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getDeletePet = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const petId = ctx.params.petId;

        petService.getPet(petId)
            .then(function (pet) {
                ctx.pet = pet;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/pet/delete-pet.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postDeletePet = function (ctx) {
        const petId = ctx.params.petId;

        petService.deletePet(petId)
            .then(function (res) {
                notifier.showSuccess('Pet removed!');
                ctx.redirect('#/pet/all');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getEditPet = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const petId = ctx.params.petId;

        petService.getPet(petId)
            .then(function (pet) {
                ctx.pet = pet;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/pet/edit-pet.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postEditPet = function (ctx) {
        const description = ctx.params.description;

        if (!description) {
            notifier.showError('Description is mandaroty.');
        } else {
            const petId = ctx.params.petId;

            petService.getPet(petId)
                .then(function (pet) {
                    pet.description = description;

                    petService.editPet(petId, pet)
                        .then(function (res) {
                            notifier.showSuccess('Pet updated!');
                            ctx.redirect('#/pet/all');
                        });
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getPetDetails = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const petId = ctx.params.petId;

        petService.getPet(petId)
            .then(function (pet) {

                ctx.pet = pet;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/pet/details-pet.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getLikePet = function (ctx) {
        const petId = ctx.params.petId;

        petService.getPet(petId)
            .then(function (pet) {
                pet.likes++;

                petService.editPet(petId, pet)
                    .then(function (res) {
                        notifier.showSuccess('Pet liked!');
                        ctx.redirect('#/pet/all');
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getCreate,
        postCreate,
        getAllPets,
        getMyPets,
        getDeletePet,
        postDeletePet,
        getEditPet,
        postEditPet,
        getPetDetails,
        getLikePet
    };
})();
