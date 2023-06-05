# topic
- speed.color.species

Q1      = *.orange.*
        = interested in all orange animals

Q2      = *.*.rabbit & lazy.#
        = all rabbits & all lazy animals


quick.orange.rabbit             = will be sent to both queues Q1, Q2
quick.orange.fox                = will only go to the first queue
lazy.brown.fox                  = only to the second. 
lazy.pink.rabbit                = delivered to Q2 only once, even though it matches two bindings. 
quick.brown.fox                 = doesn't match any binding so it will be discarded
quick.orange.new.rabbit         = doesn't match any binding so it will be discarded
lazy.orange.new.rabbit          = even though it has 4 words, it will match Q2 binding

`#` binding key
behaves like fanout exchange... receives all messages

if *, # arent used in bindings, it behaves like direct exchange
---------------------------------------------------------------------------

