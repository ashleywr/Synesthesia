// Create Factory Logistics publishes this qualification pseudo-recipe even when
// the pack has no registered chemical ingredient type. It cannot function in
// that environment and its JEI extension throws while reading it.
ServerEvents.recipes(event => {
  event.remove({
    id: 'create_factory_logistics:network_link_qualification_create_factory_logistics_chemical'
  });
});
