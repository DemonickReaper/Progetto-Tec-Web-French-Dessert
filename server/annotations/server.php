<?php 

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['search', 'read']);
    }

    public function search()
    {
        $result = Annotation::wherePageId(request('uri'))->get()->filter(function ($annotation) {
            return $annotation->isPublic() || $annotation->isOfUser(auth()->user());
        })->values();

        return response()->json([
            'total' => $result->count(),
            'rows'  => $result
        ]);
    }

    public function store()
    {
        if ($user = request('user')) {
            if ($user['id'] !== auth()->id()) {
                throw new AuthorizationException();
            }
        }

        return Annotation::create([
            'ranges'      => request('ranges'),
            'quote'       => request('quote'),
            'text'        => request('text'),
            'permissions' => $this->setPermissions(request('permissions')),
            'page_id'     => request('uri'),
            'user_id'     => auth()->id()
        ])->load('user');
    }
    public function update(Annotation $annotation)
    {
        if (! $annotation->isOfUser(auth()->user())) {
            throw new AuthorizationException();
        }

        $this->validator(request(['ranges', 'quote', 'text', 'page_id', 'rev_id', 'permissions']));

        $data = array_merge(
            request(['ranges', 'quote', 'text', 'page_id', 'rev_id']),
            ['permissions' => $this->setPermissions(request('permissions'))]
        );

        if ($annotation->update($data)) {
            return $annotation;
        }

        return response()->json(['status' => 'error']);
    }

    public function delete(Annotation $annotation)
    {
        if ($annotation->delete()) {
            return response()->json(['status' => 'success']);
        }

        return response()->json(['status' => 'error']);
    }


}
?> 
