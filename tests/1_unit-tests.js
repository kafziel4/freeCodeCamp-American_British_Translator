const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();

let translation = '';

suite('Unit Tests', () => {

    suite('Translate to British English', function() {

        test('Mangoes are my favorite fruit.', function(done) {
            translation = translator.toBritishEnglish('Mangoes are my favorite fruit.');
            assert.equal(translation[0], 'Mangoes are my favourite fruit.');
            done();
        });

        test('I ate yogurt for breakfast.', function(done) {
            translation = translator.toBritishEnglish('I ate yogurt for breakfast.');
            assert.equal(translation[0], 'I ate yoghurt for breakfast.');
            done();
        });

        test("We had a party at my friend's condo.", function(done) {
            translation = translator.toBritishEnglish("We had a party at my friend's condo.");
            assert.equal(translation[0], "We had a party at my friend's flat.");
            done();
        });

        test('Can you toss this in the trashcan for me?', function(done) {
            translation = translator.toBritishEnglish('Can you toss this in the trashcan for me?');
            assert.equal(translation[0], 'Can you toss this in the bin for me?');
            done();
        });

        test('The parking lot was full.', function(done) {
            translation = translator.toBritishEnglish('The parking lot was full.');
            assert.equal(translation[0], 'The car park was full.');
            done();
        });

        test('Like a high tech Rube Goldberg machine.', function(done) {
            translation = translator.toBritishEnglish('Like a high tech rube goldberg machine.');
            assert.equal(translation[0], 'Like a high tech Heath Robinson device.');
            done();
        });

        test('To play hooky means to skip class or work.', function(done) {
            translation = translator.toBritishEnglish('To play hooky means to skip class or work.');
            assert.equal(translation[0], 'To bunk off means to skip class or work.');
            done();
        });

        test('No Mr. Bond, I expect you to die.', function(done) {
            translation = translator.toBritishEnglish('No Mr. Bond, I expect you to die.');
            assert.equal(translation[0], 'No Mr Bond, I expect you to die.');
            done();
        });

        test('Dr. Grosh will see you now.', function(done) {
            translation = translator.toBritishEnglish('Dr. Grosh will see you now.');
            assert.equal(translation[0], 'Dr Grosh will see you now.');
            done();
        });

        test('Lunch is at 12:15 today.', function(done) {
            translation = translator.toBritishEnglish('Lunch is at 12:15 today.');
            assert.equal(translation[0], 'Lunch is at 12.15 today.');
            done();
        });
    });

    suite('Translate to American English', function() {

        test('We watched the footie match for a while.', function(done) {
            translation = translator.toAmericanEnglish('We watched the footie match for a while.');
            assert.equal(translation[0], 'We watched the soccer match for a while.');
            done();
        });

        test('Paracetamol takes up to an hour to work.', function(done) {
            translation = translator.toAmericanEnglish('Paracetamol takes up to an hour to work.');
            assert.equal(translation[0], 'Tylenol takes up to an hour to work.');
            done();
        });

        test('First, caramelise the onions.', function(done) {
            translation = translator.toAmericanEnglish('First, caramelise the onions.');
            assert.equal(translation[0], 'First, caramelize the onions.');
            done();
        });

        test('I spent the bank holiday at the funfair.', function(done) {
            translation = translator.toAmericanEnglish('I spent the bank holiday at the funfair.');
            assert.equal(translation[0], 'I spent the public holiday at the carnival.');
            done();
        });
        
        test('I had a bicky then went to the chippy.', function(done) {
            translation = translator.toAmericanEnglish('I had a bicky then went to the chippy.');
            assert.equal(translation[0], 'I had a cookie then went to the fish-and-chip shop.');
            done();
        });  

        test("I've just got bits and bobs in my bum bag.", function(done) {
            translation = translator.toAmericanEnglish("I've just got bits and bobs in my bum bag.");
            assert.equal(translation[0], "I've just got odds and ends in my fanny pack.");
            done();
        }); 
        
        test('The car boot sale at Boxted Airfield was called off.', function(done) {
            translation = translator.toAmericanEnglish('The car boot sale at Boxted Airfield was called off.');
            assert.equal(translation[0], 'The swap meet at Boxted Airfield was called off.');
            done();
        }); 

        test('Have you met Mrs Kalyani?', function(done) {
            translation = translator.toAmericanEnglish('Have you met Mrs Kalyani?');
            assert.equal(translation[0], 'Have you met Mrs. Kalyani?');
            done();
        }); 

        test("Prof Joyner of King's College, London.", function(done) {
            translation = translator.toAmericanEnglish("Prof Joyner of King's College, London.");
            assert.equal(translation[0], "Prof. Joyner of King's College, London.");
            done();
        }); 

        test('Tea time is usually around 4 or 4.30.', function(done) {
            translation = translator.toAmericanEnglish('Tea time is usually around 4 or 4.30.');
            assert.equal(translation[0], 'Tea time is usually around 4 or 4:30.');
            done();
        }); 
    });

    suite('Highlight translation', function() {

        test('Mangoes are my favorite fruit.', function(done) {
            translation = translator.toBritishEnglish('Mangoes are my favorite fruit.');
            assert.equal(translation[1], 'Mangoes are my <span class="highlight">favourite</span> fruit.');
            done();
        });

        test('I ate yogurt for breakfast.', function(done) {
            translation = translator.toBritishEnglish('I ate yogurt for breakfast.');
            assert.equal(translation[1], 'I ate <span class="highlight">yoghurt</span> for breakfast.');
            done();
        });

        test('We watched the footie match for a while.', function(done) {
            translation = translator.toAmericanEnglish('We watched the footie match for a while.');
            assert.equal(translation[1], 'We watched the <span class="highlight">soccer</span> match for a while.');
            done();
        });

        test('Paracetamol takes up to an hour to work.', function(done) {
            translation = translator.toAmericanEnglish('Paracetamol takes up to an hour to work.');
            assert.equal(translation[1], '<span class="highlight">Tylenol</span> takes up to an hour to work.');
            done();
        });
    });
});