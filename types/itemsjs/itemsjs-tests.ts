import itemsjs = require("itemsjs");

const myitems = [
    { name: "foo", anumber: 123 },
    { name: "bar", anumber: 456 },
    { name: "abc", anumber: 789 },
];

// No config
itemsjs(myitems);
// Empty config
itemsjs(myitems, {});

// Invalid sort
// @ts-expect-error
itemsjs(myitems, { sortings: { foo: {} } });

const items = itemsjs(myitems, {
    sortings: {
        foo: {
            field: "name",
            order: "asc",
        },
        bar: {
            field: "anumber",
            order: "desc",
        },
    },
    aggregations: {
        anumber: {
            title: "A Number",
            hide_zero_doc_count: true,
            conjunction: false,
            chosen_filters_on_top: false,
        },
        // @ts-expect-error `someKey` doesn't exist on the object
        someKey: {
            title: "Some Key",
        },
    },
});

items.search({ query: "abc" });

items.search({ query: "abc", sort: "foo" });

items.search({ query: "abc", sort: "bar" });

// Sort 'baz' was never defined
// @ts-expect-error
items.search({ query: "abc", sort: "baz" });

items.search({
    query: "abc",
    sort: {
        field: "anumber",
        order: "desc",
    },
});

items.search({
    query: "abc",
    filters: {}, // No filters provided
});

// Aggregation 'bar' was never defined
items.search({
    query: "abc",
    // @ts-expect-error
    filters: { bar: [] },
});

items.search({
    query: "abc",
    filters: { anumber: ["abc"] },
});

// Aggregation 'bar' was never defined
// @ts-expect-error
items.aggregation({ name: "bar" });

items.aggregation({ name: "anumber" });

// Test searching with aggregations
const search = items.search();
const anumberAggregations = search.data.aggregations["anumber"];

// $ExpectType string | number
anumberAggregations.buckets[0].key;

itemsjs<typeof myitems[number]>([]).reindex(myitems);

const myItemsIds = myitems.map((v, i) => ({ id: i, ...v }));

const itemsIds = itemsjs(myItemsIds);

// ID 'abc' is invalid
// @ts-expect-error
itemsIds.similar("abc", { field: "name" });

// Missing options & missing field key
// @ts-expect-error
itemsIds.similar(0);
// @ts-expect-error
itemsIds.similar(0, {});

itemsIds.similar(0, { field: "name" });

// Custom id field should be an existing key in the object
itemsjs(myitems, {
    custom_id_field: "name",
});

itemsjs(myitems, {
    // @ts-expect-error
    custom_id_field: "keyThatDoesNotExist",
});

// Ids types should match the custom_id_field type
const itemsCustomId = itemsjs(myitems, {
    custom_id_field: "name",
});
// @ts-expect-error
itemsCustomId.search({ ids: [1, 2] });
// @ts-expect-error
itemsCustomId.similar(1, { field: "name" });
itemsCustomId.similar("a", { field: "name" });
itemsCustomId.search({ ids: ["foo", "bar"] });
itemsCustomId.search({
    // @ts-expect-error
    ids: [1],
});
itemsCustomId.search({
    ids: ["a"],
});

// @ts-expect-error Can only pass objects
itemsjs("foo");
// @ts-expect-error Can only pass objects
itemsjs(123);
